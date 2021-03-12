package com.pagantis.pagacoin.service;

import java.util.List;
import com.pagantis.pagacoin.entity.WalletEntity;

public interface WalletService {
  WalletEntity findById(String walletId);
  WalletEntity findById(String walletId, Boolean viewed);
  List<WalletEntity> findAll();
  List<WalletEntity> findAllByUserId(String userId);
  void execTransferMoney(String walletId, String sourceId, Double amount);
  void execChargeMoney(String walletId, Double amount);
  WalletEntity transferMoney(String walletId, String sourceWalletId, Double amount);
  WalletEntity chargeMoney(String walletId, Double amount);
}
