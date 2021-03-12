package com.pagantis.pagacoin.service;

import com.pagantis.pagacoin.entity.UserEntity;

import java.util.List;

public interface UserService {
    UserEntity findById(String userId);
    List<UserEntity> search(String query);
    List<UserEntity> findAll();
}
