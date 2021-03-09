package com.pagantins.pagacoin.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.pagantins.pagacoin.model.Transaction;

public interface TransactionRepository extends MongoRepository<Transaction, String> {}
