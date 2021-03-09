package com.pagantins.pagacoin.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.hateoas.ResourceSupport;

@Document(collection = "transactions")
public class Transaction extends ResourceSupport {
  @Id
  private String id;

  public Transaction(long amount, String source, String target) {
    this.amount = amount;
    this.source = source;
    this.target = target;
    this.timestamp = System.currentTimeMillis();
    this.status = "pending";
  }

  private String source;

  private String target;
  
  private long amount;

  private long timestamp;

  private String status;

  public String getpId() {
    return id;
  }

  public String getSource(){
    return source;
  }

  public String getTarget(){
    return target;
  }

  public long getAmount(){
    return amount;
  }

  public void setStatus(String status) {
    this.status = status;
  }

  @Override
  public String toString() {
    return "Person [id=" + id + ",amount=" + amount + ", target=" + target + ", source=" + source + "]";
  }
}
