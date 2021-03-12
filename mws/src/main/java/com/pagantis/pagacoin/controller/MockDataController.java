package com.pagantis.pagacoin.controller;


// Springboot
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
// Entities
import com.pagantis.pagacoin.model.MockDataPayloadModel;
// Services
import com.pagantis.pagacoin.service.MockDataService;


@RestController
@RequestMapping("/mock")
public class MockDataController {

  @Autowired
  private MockDataService mockDataService;

  @RequestMapping
  public HttpEntity<String> status() {
    return new ResponseEntity<String>("Greetings from Spring Boot!", HttpStatus.OK);
  }

  @RequestMapping(value = "/populate", method = RequestMethod.POST)
  public HttpEntity<String> populate() {
    
    mockDataService.populate(new MockDataPayloadModel());
    
    return new ResponseEntity<String>("Example data generated succesfuly", HttpStatus.OK);
  }
  
}
