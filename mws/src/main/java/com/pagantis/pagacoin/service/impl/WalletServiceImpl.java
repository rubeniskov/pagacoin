package com.pagantis.pagacoin.service.impl;

// Core
import java.util.List;
import java.util.Optional;

// Springboot
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
// Entities
import com.pagantis.pagacoin.entity.TransactionEntity;
import com.pagantis.pagacoin.entity.WalletEntity;
// Exceptions
import com.pagantis.pagacoin.exception.NotFoundException;
import com.pagantis.pagacoin.exception.InvalidInputException;
// Repositories
import com.pagantis.pagacoin.repository.WalletRepository;
// Services
import com.pagantis.pagacoin.service.WalletService;
import com.pagantis.pagacoin.service.TransactionService;


@Service
public class WalletServiceImpl implements WalletService {

    @Autowired
    private WalletRepository walletRepository;

    @Autowired
    private TransactionService transactionService;

    @Override
    public List<WalletEntity> findAll() {
        return walletRepository.getAll();
    }

    @Override
    public List<WalletEntity> findAllByUserId(String userId){
      return walletRepository.getAllByUserId(userId);
    };
    
    @Override
    public WalletEntity findById(String walletId) {
      return this.findById(walletId, true);
    }

    @Override
    public WalletEntity findById(String walletId, Boolean viewed) {
        
      Optional<WalletEntity> wallet = ((viewed ? walletRepository.getById(walletId) : walletRepository.findById(walletId)));
      return wallet.orElseThrow(() -> new NotFoundException("wallet"));
    }

    @Override
    public void execTransferMoney(String walletId, String sourceId, Double amount) {
      
      if (sourceId == null) {
        throw new InvalidInputException("sourceId must be defined");
      }

      TransactionEntity transaction = new TransactionEntity(walletId, sourceId, amount);
      
      transactionService.save(transaction);
    }
    
    @Override
    public void execChargeMoney(String walletId, Double amount) {
      
      TransactionEntity transaction = new TransactionEntity(walletId, amount);
      
      transactionService.save(transaction);
    }

    @Override
    public WalletEntity transferMoney(String walletId, String sourceId, Double amount) {

      this.execTransferMoney(walletId, sourceId, amount);

      return this.findById(walletId);
    }

    @Override
    public WalletEntity chargeMoney(String walletId, Double amount) {

      this.execChargeMoney(walletId, amount);

      return this.findById(walletId);
    }
}
