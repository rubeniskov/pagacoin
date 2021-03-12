package com.pagantis.pagacoin.repository.impl;

import java.util.List;

import org.bson.Document;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.AggregationResults;
import org.springframework.data.mongodb.core.aggregation.ArithmeticOperators;
import org.springframework.data.mongodb.core.aggregation.ArrayOperators;
import org.springframework.data.mongodb.core.aggregation.AggregationOperation;
import org.springframework.data.mongodb.core.aggregation.AggregationOperationContext;
import org.springframework.data.mongodb.core.aggregation.ArrayOperators.Reduce.Variable;


import com.pagantis.pagacoin.repository.TransactionCustomRepository;
import com.pagantis.pagacoin.entity.TransactionEntity;

public class TransactionRepositoryImpl implements TransactionCustomRepository {
  @Autowired
  private MongoOperations mongoOperations;
  
  @Override
  public List<TransactionEntity> findAllByWalletId() {
  
    Aggregation aggregate = Aggregation.newAggregation(
      // This will be removed when the right write conververtes is implemented
      new AggregationOperation(){ 
        @Override 
        public Document toDocument(AggregationOperationContext aoc) {
           return new Document("$addFields", new Document("walletId",new Document("$toString","$_id")));
        }
      },
      Aggregation.lookup("transactions", "walletId", "walletId", "incomeTransactions"),
      Aggregation.lookup("transactions", "walletId", "sourceId", "outcomeTransactions"),
      Aggregation.project("userId", "cdate") 
        .and(ArrayOperators.arrayOf("incomeTransactions")
        .reduce(
          ArithmeticOperators
            .valueOf(Variable.VALUE.getName())
            .add(Variable.THIS.referringTo("amount").getName()))
          .startingWith(0))
        .as("incomes")
        .and(ArrayOperators.arrayOf("outomeTransactions")
        .reduce(
          ArithmeticOperators
            .valueOf(Variable.VALUE.getName())
            .add(Variable.THIS.referringTo("amount").getName()))
          .startingWith(0))
        .as("outcomes"),
      Aggregation.project("userId", "cdate")
        .and(ArithmeticOperators.Subtract.valueOf("$icomes").subtract("$outcomes"))
        .as("balance")
    );

    AggregationResults<TransactionEntity> walletAggregate = mongoOperations.aggregate(aggregate,
                    "wallets", TransactionEntity.class);

    return walletAggregate.getMappedResults();

  }
}
