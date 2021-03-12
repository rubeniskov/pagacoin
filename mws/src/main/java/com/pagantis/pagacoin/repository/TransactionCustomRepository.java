package com.pagantis.pagacoin.repository;

import java.util.List;

import com.pagantis.pagacoin.entity.TransactionEntity;

public interface TransactionCustomRepository {
  List<TransactionEntity> findAllByWalletId();
}
