package com.pagantis.pagacoin.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@NoArgsConstructor
@ToString
@Document(collection = "wallets")
public class WalletEntity {
  @Id
  private String id;
  private String userId;
  private Double balance;
  private long cdate;
  
  public WalletEntity(String userId) {
    this.userId = userId;
    this.cdate = System.currentTimeMillis();
  }
}
