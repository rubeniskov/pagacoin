package com.pagantis.pagacoin.repository.impl;

// Core
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import org.bson.Document;
// Springboot
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.aggregation.ArithmeticOperators;
import org.springframework.data.mongodb.core.aggregation.ArrayOperators;
import org.springframework.data.mongodb.core.aggregation.MatchOperation;
import org.springframework.data.mongodb.core.aggregation.AggregationOperation;
import org.springframework.data.mongodb.core.aggregation.AggregationOperationContext;
import org.springframework.data.mongodb.core.aggregation.ArrayOperators.Reduce.Variable;
import org.springframework.data.mongodb.core.query.Criteria;
import static org.springframework.data.mongodb.core.aggregation.Aggregation.*;
// Repositories
import com.pagantis.pagacoin.repository.WalletCustomRepository;
// Entities
import com.pagantis.pagacoin.entity.WalletEntity;

public class WalletRepositoryImpl implements WalletCustomRepository {
  @Autowired
  private MongoOperations mongoOperations;

  private static ArrayList<AggregationOperation> getViewStages() {
    return new ArrayList<AggregationOperation>(){{
        add(new AggregationOperation(){ 
          @Override 
          public Document toDocument(AggregationOperationContext aoc) {
            return new Document("$addFields", new Document("walletId",new Document("$toString","$_id")));
          }
        });
        add(lookup("transactions", "walletId", "walletId", "incomeTransactions"));
        add(lookup("transactions", "walletId", "sourceId", "outcomeTransactions"));
        add(project("userId", "cdate") 
        .and(ArrayOperators.arrayOf("incomeTransactions")
        .reduce(
          ArithmeticOperators
            .valueOf(Variable.VALUE.getName())
            .add(Variable.THIS.referringTo("amount").getName()))
          .startingWith(0))
        .as("incomes")
        .and(ArrayOperators.arrayOf("outcomeTransactions")
        .reduce(
          ArithmeticOperators
            .valueOf(Variable.VALUE.getName())
            .add(Variable.THIS.referringTo("amount").getName()))
          .startingWith(0))
        .as("outcomes"));
        add(project("userId", "cdate")
        .and(ArithmeticOperators.Divide
          .valueOf(ArithmeticOperators.Trunc
            .truncValueOf(
              ArithmeticOperators.Multiply
                .valueOf(ArithmeticOperators.Subtract.valueOf("$incomes").subtract("$outcomes")).multiplyBy(100)))
          .divideBy(100)
        )
        .as("balance"));
    }};
  } 

  @Override
  public List<WalletEntity> getAll() {
    return mongoOperations
      .aggregate(newAggregation(getViewStages()), "wallets", WalletEntity.class)
      .getMappedResults();
  }

  @Override
  public List<WalletEntity> getAllByUserId(String userId) {

    ArrayList<AggregationOperation> matchViewStages = getViewStages();
    MatchOperation matchStage = match(new Criteria("userId").is(userId));

    matchViewStages.add(0, matchStage);

    return mongoOperations
      .aggregate(newAggregation(matchViewStages), "wallets", WalletEntity.class)
      .getMappedResults();
  }

  /**
   * Gets a wallet by id from the a view with the current balance
   */
  @Override 
  public Optional<WalletEntity> getById(String id) {
    
    ArrayList<AggregationOperation> matchViewStages = getViewStages();
    MatchOperation matchStage = match(new Criteria("_id").is(id));

    matchViewStages.add(0, matchStage);
    
    WalletEntity entry = mongoOperations
      .aggregate(newAggregation(matchViewStages), "wallets", WalletEntity.class)
      .getUniqueMappedResult();

    if (entry == null) {
      return Optional.empty();
    }

    Optional<WalletEntity> value = Optional.of(entry);

    return value;
  }
}
