package com.pagantis.pagacoin.controller;

import java.util.List;
import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

import com.pagantis.pagacoin.model.TransactionModel;
import com.pagantis.pagacoin.entity.TransactionEntity;
// import com.pagantis.pagacoin.service.TransactionService;
import java.util.Optional;
import com.pagantis.pagacoin.repository.TransactionRepository;
import com.pagantis.pagacoin.assembler.TransactionModelAssembler;

import org.springframework.hateoas.CollectionModel;

@RestController
@RequestMapping("/transactions")
public class TransactionController {
  
  // @Autowired
  // private TransactionService service;

  @Autowired
  private TransactionRepository repository;

  @Autowired
	private TransactionModelAssembler assembler;

  @RequestMapping(method = RequestMethod.GET)
  public ResponseEntity<CollectionModel<TransactionModel>> getAll() {
    List<TransactionEntity> transactions = (List<TransactionEntity>) repository.findAll();
		if (transactions.isEmpty()) {
      return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    } else {
      return new ResponseEntity<>(
        assembler.toCollectionModel(transactions), HttpStatus.OK);  
    }
  }

  @RequestMapping(method = RequestMethod.POST)
  public HttpEntity<TransactionEntity> create() {
    TransactionEntity transaction = new TransactionEntity("123123", "123123", 100.0);
    repository.save(transaction);

    // if (transaction == null) {
    //     return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    // } else {
    //   return new ResponseEntity<>(assembler.toCollectionModel(transactions), HttpStatus.OK);  
    // }
    return new ResponseEntity<TransactionEntity>(transaction, HttpStatus.OK);
  }

  @RequestMapping(value = "/{id}", method = RequestMethod.GET)
  public ResponseEntity<TransactionModel> getById(@PathVariable("id") String transactionId) {
    
    TransactionEntity transaction = (TransactionEntity)(repository.findById(transactionId).get());
    
    if (transaction == null) {
      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    } 

    return new ResponseEntity<>(assembler.toModel(transaction), HttpStatus.OK);
  }

  
}
