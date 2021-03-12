package com.pagantis.pagacoin.service;

import com.pagantis.pagacoin.entity.TransactionEntity;

import java.util.List;

public interface TransactionService {
    TransactionEntity save(TransactionEntity transaction);
    List<TransactionEntity> findAll();
}
