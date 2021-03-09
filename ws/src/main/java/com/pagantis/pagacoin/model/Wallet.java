package com.pagantins.pagacoin;

import org.springframework.data.annotation.Id;

public class Wallet {
  @Id
  private String hash;

  private Integer userId;

  public String getHash() {
    return hash;
  }
}
