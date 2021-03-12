package com.pagantis.pagacoin.repository.impl;

// Core
import java.util.List;
// Springboot
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.BasicQuery;
// Repositories
import com.pagantis.pagacoin.repository.UserCustomRepository;
// Entities
import com.pagantis.pagacoin.entity.UserEntity;

public class UserRepositoryImpl implements UserCustomRepository {
  @Autowired
  private MongoOperations mongoOperations;

  @Override
  public List<UserEntity> search(String query) {
    return mongoOperations.find(new BasicQuery("{ $expr: {'$regexMatch': { 'input': { '$concat': ['$firstname', ' ', '$lastname'] }, 'regex': '" + query + "', 'options': 'i' }}}"), UserEntity.class);
  }
}
