package com.pagantis.pagacoin.model;

import org.springframework.hateoas.RepresentationModel;
import org.springframework.hateoas.server.core.Relation;

import lombok.Data;

@Data
@Relation(collectionRelation = "wallets")
public class WalletModel extends RepresentationModel<WalletModel> {
  private String id;
  private String userId;
  private Double balance;
  private long cdate;
}
