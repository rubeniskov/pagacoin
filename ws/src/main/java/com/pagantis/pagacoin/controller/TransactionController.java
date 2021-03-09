package com.pagantins.pagacoin.controller;

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

import static org.springframework.hateoas.mvc.ControllerLinkBuilder.linkTo;
import static org.springframework.hateoas.mvc.ControllerLinkBuilder.methodOn;

import com.pagantins.pagacoin.model.Transaction;
import com.pagantins.pagacoin.service.TransactionService;

@RestController
@RequestMapping("/transactions")
public class TransactionController {
  
  @Autowired
  private TransactionService service;

  @RequestMapping(value = "/list/", method = RequestMethod.GET)
  public HttpEntity<List<Transaction>> getAll() {
      List<Transaction> transactions = service.findAll();
      if (transactions.isEmpty()) {
          return new ResponseEntity<>(HttpStatus.NO_CONTENT);
      } else {
          // transactions.forEach(e -> e.add(linkTo(methodOn(TransactionController.class).getAll()).withRel("transactions")));
          // transactions.forEach(e -> e.add(linkTo(methodOn(TransactionController.class).getById(e.getpId())).withSelfRel()));
          return new ResponseEntity<>(transactions, HttpStatus.OK);
      }
  }

  @RequestMapping(value = "/{id}", method = RequestMethod.GET)
  public HttpEntity<Transaction> getById(@PathVariable("id") String transactionId) {
    Transaction transaction = service.findById(transactionId);
    if (transaction == null) {
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    } else {
        // transaction.add(linkTo(methodOn(TransactionController.class).getById(transaction.getpId())).withSelfRel());
        return new ResponseEntity<>(transaction, HttpStatus.OK);
    }
  }
}



  // public TransactionController(TransactionRepository repository) {
  //     this.repository = repository;
  // }

  // @RequestMapping("/")
  // public List<Transaction> findAll() {
  //   // List<Transaction> transactions = new ArrayList<Transaction>();

  //   // transactions.add(new Transaction(410, "b31d032cfdcf47a399990a71e43c5d2a", "431d032cfdcf47a399990a71e43c5d2a"));
  //   // transactions.add(new Transaction(969, "b31d032cfdcf47a399990a71e43c5d2a", "431d032cfdcf47a399990a71e43c5d2a"));
  //   // transactions.add(new Transaction(1000, "b31d032cfdcf47a399990a71e43c5d2a", "431d032cfdcf47a399990a71e43c5d2a"));
  //   // return transactions;
  //   return repository.findAll();
	// }


  // @GetMapping("/user")
  // public String read() {
	// 	// model.addAttribute("name", name);
	// 	return "id";
	// }

  // @RequestMapping("/")
	// public String index() {
	// 	// return "Greetings from 17 Spring Boot!";
  //   return "this is a test 17";
	// }
	// public String read(@PathVariable String id) {
	// 	// model.addAttribute("name", name);
	// 	return "id";
	// }
