package com.pagantis.pagacoin.model;

import org.springframework.hateoas.RepresentationModel;
import org.springframework.hateoas.server.core.Relation;

import lombok.Data;

@Data
@Relation(collectionRelation = "transactions")
public class TransactionModel extends RepresentationModel<TransactionModel> {
  private String id;
  private String walletId;
  private String sourceId;
  private Double amount;
  private String status;
  private long cdate;
}
