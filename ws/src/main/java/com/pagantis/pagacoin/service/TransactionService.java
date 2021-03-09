package com.pagantins.pagacoin.service;

import com.pagantins.pagacoin.model.Transaction;

import java.util.List;

public interface TransactionService {
    Transaction findById(String transactionId);
    List<Transaction> findAll();
}
