package com.pagantis.pagacoin.service.impl;

// Core
import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import org.apache.commons.math3.util.Precision;
import java.util.function.Predicate;
import java.util.stream.Collectors;
// Springboot
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
// Data Mock
import com.github.javafaker.Faker;
// Models
import com.pagantis.pagacoin.model.MockDataPayloadModel;
import com.pagantis.pagacoin.model.MockDataStatusModel;
// Entities
import com.pagantis.pagacoin.entity.TransactionEntity;
import com.pagantis.pagacoin.entity.WalletEntity;
import com.pagantis.pagacoin.entity.UserEntity;
import com.pagantis.pagacoin.exception.InsufficientBalanceException;
// Exceptions
import com.pagantis.pagacoin.exception.NotFoundException;
// Repositories
import com.pagantis.pagacoin.repository.WalletRepository;
import com.pagantis.pagacoin.repository.TransactionRepository;
import com.pagantis.pagacoin.repository.UserRepository;
// Services
import com.pagantis.pagacoin.service.MockDataService;
import com.pagantis.pagacoin.service.WalletService;
import com.pagantis.pagacoin.service.TransactionService;


@Service
public class MockDataServiceImpl implements MockDataService {
  
  @Autowired
  private WalletRepository walletRepository;
  
  @Autowired
  private TransactionRepository transactionRepository;

  @Autowired
  private UserRepository userRepository;

  @Autowired
  private WalletService walletService;

  @Override
  public MockDataStatusModel populate(MockDataPayloadModel payload) {
    userRepository.deleteAll();
    transactionRepository.deleteAll();
    walletRepository.deleteAll();

    Faker faker = new Faker();
    ArrayList<WalletEntity> wallets = new ArrayList<WalletEntity>();
    Random rand = new Random();

    Integer minUsers = 1;
    Integer maxUsers = 10;
    Integer minWalletsPerUser = 1;
    Integer maxWalletsPerUser = 5;
    Integer minTransactions = 0;
    Integer maxTransactions = 2000;
    Integer minTransactionAmount = 0;
    Integer maxTransactionAmount = 1000;

    Integer usersCount = rand.nextInt(maxUsers - minUsers) + minUsers;

    for(int i = 0; i <= usersCount; i++ ) {
      UserEntity user = new UserEntity(faker.name().firstName(), faker.name().lastName());
      Integer walletsCount = rand.nextInt(maxWalletsPerUser - minWalletsPerUser) + minWalletsPerUser;

      userRepository.save(user);
      
      for(int j = 0; j <= walletsCount; j++ ) {
        WalletEntity wallet = new WalletEntity(user.getId());
        walletRepository.save(wallet);
        wallets.add(wallet);
      }
    }

    Integer transactionsCount = rand.nextInt(maxTransactions - minTransactions) + minTransactions;

    for(int i = 0; i <= transactionsCount; i++ ) {
      Integer walletIndex = rand.nextInt(wallets.size());
      WalletEntity wallet = wallets.get(walletIndex);
      Double amount = Precision.round((rand.nextDouble() * maxTransactionAmount - minTransactionAmount) + minTransactionAmount, 2);
      
      try {
        Predicate<WalletEntity> excludeItselfWalletFilter = witem -> !witem.getId().equals(wallet.getId());
        List<WalletEntity> walletPossibleSources = wallets
          .stream()
          .filter(excludeItselfWalletFilter)
          .collect(Collectors.toList());

        Integer sourceWalletIndex = rand.nextInt(walletPossibleSources.size());
        WalletEntity sourceWallet = walletPossibleSources.get(sourceWalletIndex);

        walletService.execTransferMoney(wallet.getId(), sourceWallet.getId(), amount);

      } catch (InsufficientBalanceException ex) {
        walletService.execChargeMoney(wallet.getId(), amount);
      } catch (RuntimeException ex) {
        throw ex;
      }
    }
    return new MockDataStatusModel();
  }
}


// userRepository.deleteAll();
// transactionRepository.deleteAll();
// walletRepository.deleteAll();

// Faker faker = new Faker();
// ArrayList<WalletEntity> wallets = new ArrayList<WalletEntity>();
// Random rand = new Random();

// Integer minUsers = 1;
// Integer maxUsers = 100;
// Integer minWalletsPerUser = 0;
// Integer maxWalletsPerUser = 25;
// Integer minTransactions = 0;
// Integer maxTransactions = 10000;
// Integer minTransactionAmount = 0;
// Integer maxTransactionAmount = 1000;

// Integer usersCount = rand.nextInt(maxUsers - minUsers) + minUsers;

// for(int i = 0; i <= usersCount; i++ ) {
//   UserEntity user = new UserEntity(faker.name().firstName(), faker.name().lastName());
//   Integer walletsCount = rand.nextInt(maxWalletsPerUser - minWalletsPerUser) + minWalletsPerUser;

//   userRepository.save(user);
  
//   for(int j = 0; j <= walletsCount; j++ ) {
//     WalletEntity wallet = new WalletEntity(user.getId());
//     walletRepository.save(wallet);
//     wallets.add(wallet);
//   }
// }

// Integer transactionsCount = rand.nextInt(maxTransactions - minTransactions) + minTransactions;

// for(int i = 0; i <= transactionsCount; i++ ) {
//   TransactionEntity transaction;
//   Integer walletIndex = rand.nextInt(wallets.size());
//   WalletEntity wallet = wallets.get(walletIndex);
//   Double amount = Precision.round((rand.nextDouble() * maxTransactionAmount - minTransactionAmount) + minTransactionAmount, 2);
  
//   // 70% Transfers between wallets
//   // if (rand.nextInt(100) > 70) {
//   if (true) {  
//     Integer sourceWalletIndex = rand.nextInt(wallets.size());
//     WalletEntity sourceWallet = wallets.get(sourceWalletIndex);
//     transaction = new TransactionEntity(wallet.getId(), sourceWallet.getId(), amount);
//   } else {
//     transaction = new TransactionEntity(wallet.getId(), amount);
//   }

//   transactionRepository.save(transaction);
// }

// return new ResponseEntity<String>("Example data generated succesfuly", HttpStatus.OK);
