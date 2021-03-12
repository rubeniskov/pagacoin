package com.pagantis.pagacoin.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.pagantis.pagacoin.entity.TransactionEntity;


public interface TransactionRepository extends MongoRepository<TransactionEntity, String> {}
