package com.pagantis.pagacoin.repository;

import java.util.List;
import java.util.Optional;

import com.pagantis.pagacoin.entity.WalletEntity;


public interface WalletCustomRepository {
  List<WalletEntity> getAll();
  List<WalletEntity> getAllByUserId(String userId);
  Optional<WalletEntity> getById(String id);
}
