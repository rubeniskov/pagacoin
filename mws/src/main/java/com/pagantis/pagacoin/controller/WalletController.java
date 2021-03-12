package com.pagantis.pagacoin.controller;

import java.util.List;
import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

import com.pagantis.pagacoin.model.TransferMoneyPayloadModel;
import com.pagantis.pagacoin.model.ChargeMoneyPayloadModel;
import com.pagantis.pagacoin.model.WalletModel;
import com.pagantis.pagacoin.entity.WalletEntity;
import com.pagantis.pagacoin.service.WalletService;

import java.util.Optional;
import com.pagantis.pagacoin.repository.WalletRepository;
import com.pagantis.pagacoin.assembler.WalletModelAssembler;

import org.springframework.hateoas.CollectionModel;

@RestController
@RequestMapping("/wallets")
public class WalletController {
  
  // @Autowired
  // private WalletService service;

  @Autowired
  private WalletRepository repository;

  @Autowired
  private WalletService service;

  @Autowired
  private WalletModelAssembler assembler;

  @RequestMapping(method = RequestMethod.POST)
  public HttpEntity<WalletEntity> create() {
    WalletEntity wallet = new WalletEntity("yeah");
    repository.save(wallet);
    return new ResponseEntity<WalletEntity>(wallet, HttpStatus.OK);
  }

  @RequestMapping(method = RequestMethod.GET)
  public ResponseEntity<CollectionModel<WalletModel>> getAll(
    @RequestParam(required = false) String userId
  ) {
    
    List<WalletEntity> wallets;
    
    if (userId == null) {
      wallets = service.findAll();
    } else {
      wallets = service.findAllByUserId(userId);
    }
    
    if (wallets.isEmpty()) {
      return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    } else {
      return new ResponseEntity<>(
        assembler.toCollectionModel(wallets), HttpStatus.OK);  
    }
  }

  @RequestMapping(value = "/{id}", method = RequestMethod.GET)
  public ResponseEntity<WalletModel> getById(@PathVariable("id") String walletId) {
    
    WalletEntity wallet = service.findById(walletId);

    return new ResponseEntity<>(assembler.toModel(wallet), HttpStatus.OK);
  }

  @RequestMapping(value = "/{id}/transfer", method = RequestMethod.POST)
  public ResponseEntity<WalletModel> transferMoney(@PathVariable("id") String walletId, @RequestBody TransferMoneyPayloadModel payload) {
    
    WalletEntity wallet = service.transferMoney(payload.getTargetId(), walletId, payload.getAmount());
    
    return new ResponseEntity<>(assembler.toModel(wallet), HttpStatus.OK);
  }

  @RequestMapping(value = "/{id}/charge", method = RequestMethod.POST)
  public ResponseEntity<WalletModel> chargeMoney(@PathVariable("id") String walletId, @RequestBody ChargeMoneyPayloadModel payload) {
    
    WalletEntity wallet = service.chargeMoney(walletId, payload.getAmount());
    
    return new ResponseEntity<>(assembler.toModel(wallet), HttpStatus.OK);
  }
}
