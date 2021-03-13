package com.pagantis.pagacoin.controller;


// Springboot
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;

import java.util.LinkedHashMap;
import java.util.Map;

// Entities
import com.pagantis.pagacoin.model.MockDataPayloadModel;
// Services
import com.pagantis.pagacoin.service.MockDataService;


@RestController
@RequestMapping("/mock")
public class MockDataController {

  @Autowired
  private MockDataService mockDataService;

  @RequestMapping(value = "/status", method = RequestMethod.GET)
  public HttpEntity<Object> status() {
    Map<String, Object> body = new LinkedHashMap<>();
    body.put("status", "OK");
    body.put("statistics", new LinkedHashMap<String, Object>(){{
      put("users", mockDataService.getUsersCount());
      put("wallets", mockDataService.getWalletsCount());
      put("transactions", mockDataService.getTransactionsCount());
    }});

    return new ResponseEntity<>(body, HttpStatus.OK);
  }

  @RequestMapping(value = "/populate", method = RequestMethod.POST)
  public HttpEntity<Object> populate() {
    
    mockDataService.populate(new MockDataPayloadModel());
    

    Map<String, Object> body = new LinkedHashMap<>();
    body.put("status", "OK");
    body.put("statistics", new LinkedHashMap<String, Object>(){{
      put("users", mockDataService.getUsersCount());
      put("wallets", mockDataService.getWalletsCount());
      put("transactions", mockDataService.getTransactionsCount());
    }});

    return new ResponseEntity<>(body, HttpStatus.OK);
  }
  
}
