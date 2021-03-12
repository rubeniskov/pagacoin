package com.pagantis.pagacoin.model;

import lombok.Data;

@Data
public class TransferMoneyPayloadModel {
  private String targetId;
  private Double amount;
}
