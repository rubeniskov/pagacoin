package com.pagantis.pagacoin.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.pagantis.pagacoin.entity.UserEntity;


public interface UserRepository extends UserCustomRepository, MongoRepository<UserEntity, String> {}
