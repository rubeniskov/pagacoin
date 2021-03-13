package com.pagantis.pagacoin.service;

import com.pagantis.pagacoin.model.MockDataStatusModel;
import com.pagantis.pagacoin.model.MockDataPayloadModel;

public interface MockDataService  {
  MockDataStatusModel populate(MockDataPayloadModel payload);
  long getUsersCount();
  long getWalletsCount();
  long getTransactionsCount();
}
