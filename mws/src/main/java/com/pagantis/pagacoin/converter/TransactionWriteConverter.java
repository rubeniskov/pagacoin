package com.pagantis.pagacoin.converter;

import com.mongodb.BasicDBObject;
import com.mongodb.DBObject;
import com.pagantis.pagacoin.entity.TransactionEntity;

import org.springframework.core.convert.converter.Converter;

public class TransactionWriteConverter implements Converter<TransactionEntity, DBObject> {

  public DBObject convert(TransactionEntity source) {
    DBObject dbo = new BasicDBObject();
    dbo.put("_id", source.getId());
    dbo.put("walletId", source.getWalletId());
    return dbo;
  }

}
