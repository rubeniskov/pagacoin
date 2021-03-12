package com.pagantis.pagacoin.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@NoArgsConstructor
@ToString
@Document(collection = "transactions")
public class TransactionEntity {
  @Id
  private String id;
  @Indexed
  private String walletId;
  @Indexed
  private String sourceId;
  private Double amount;
  @Indexed
  private String status;
  private long cdate;

  public TransactionEntity(String walletId, Double amount) {
    this.walletId = walletId;
    this.amount = amount;
    this.cdate = System.currentTimeMillis();
    this.status = "pending";
  }

  public TransactionEntity(String walletId, String sourceId, Double amount) {
    this.walletId = walletId;
    this.sourceId = sourceId;
    this.amount = amount;
    this.cdate = System.currentTimeMillis();
    this.status = "pending";
  }
}
