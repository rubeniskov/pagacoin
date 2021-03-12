package com.pagantis.pagacoin.repository;

import com.pagantis.pagacoin.entity.UserEntity;

import java.util.List;

public interface UserCustomRepository {
  List<UserEntity> search(String query);
}
