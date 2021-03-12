package com.pagantis.pagacoin.service.impl;

// Springboot
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
// Exceptions
import com.pagantis.pagacoin.exception.CyclicReferenceException;
import com.pagantis.pagacoin.exception.InsufficientBalanceException;
import com.pagantis.pagacoin.exception.InvalidInputException;
// Entities
import com.pagantis.pagacoin.entity.TransactionEntity;
import com.pagantis.pagacoin.entity.WalletEntity;
// Repositories
import com.pagantis.pagacoin.repository.TransactionRepository;
// Services
import com.pagantis.pagacoin.service.TransactionService;
import com.pagantis.pagacoin.service.WalletService;
// Core
import java.util.List;


@Service
public class TransactionServiceImpl implements TransactionService {

    @Autowired
    private TransactionRepository transactionRepository;
    
    @Autowired
    private WalletService walletService;

    @Override
    public TransactionEntity save(TransactionEntity transaction) {

      if (transaction.getWalletId() == null) {
        throw new InvalidInputException("walletId must be defined");
      }

      if (transaction.getAmount() == null) {
        throw new InvalidInputException("amount");
      }

      if (transaction.getAmount() <= 0) {
        throw new InvalidInputException("amount");
      }
      
      walletService.findById(transaction.getWalletId(), false);

      if (transaction.getSourceId() != null) {
        
        if (transaction.getWalletId().equals(transaction.getSourceId())) {
          throw new CyclicReferenceException("transaction", transaction.getSourceId());
        }

        WalletEntity sourceWallet = walletService.findById(transaction.getSourceId(), true);

        if (sourceWallet.getBalance() < transaction.getAmount()) {
          throw new InsufficientBalanceException(sourceWallet.getId());
        }
      }

      transactionRepository.save(transaction);
      
      return transaction;
    }

    @Override
    public List<TransactionEntity> findAll() {
        return transactionRepository.findAll();
    }
}
