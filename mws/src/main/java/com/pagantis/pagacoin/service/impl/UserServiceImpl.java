package com.pagantis.pagacoin.service.impl;

import com.pagantis.pagacoin.entity.UserEntity;
import com.pagantis.pagacoin.exception.NotFoundException;
import com.pagantis.pagacoin.repository.UserRepository;
import com.pagantis.pagacoin.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository repository;

    @Override
    public UserEntity findById(String userId) {
      return repository.findById(userId).orElseThrow(() -> new NotFoundException("user"));
    }

    @Override
    public List<UserEntity> search(String query) {
        return repository.search(query);
    }

    @Override
    public List<UserEntity> findAll() {
        return repository.findAll();
    }
}
