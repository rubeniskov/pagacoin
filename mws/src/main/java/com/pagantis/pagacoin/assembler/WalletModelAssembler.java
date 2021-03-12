package com.pagantis.pagacoin.assembler;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;
import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.server.mvc.RepresentationModelAssemblerSupport;
import org.springframework.hateoas.server.mvc.WebMvcLinkBuilder;

import com.pagantis.pagacoin.entity.WalletEntity;
import com.pagantis.pagacoin.model.WalletModel;
import com.pagantis.pagacoin.controller.WalletController;

@Component
public class WalletModelAssembler extends RepresentationModelAssemblerSupport<WalletEntity, WalletModel> {
  public WalletModelAssembler() {
    super(WalletController.class, WalletModel.class);
  }

  @Override
  public WalletModel toModel(WalletEntity entity) 
  {
    WalletModel model = instantiateModel(entity);

    model.add(linkTo(
        methodOn(WalletController.class)
        .getById(entity.getId()))
        .withSelfRel());
    
    model.setId(entity.getId());
    model.setUserId(entity.getUserId());
    model.setBalance(entity.getBalance());
    model.setCdate(entity.getCdate());

    return model;
  }
  
  @Override
  public CollectionModel<WalletModel> toCollectionModel(Iterable<? extends WalletEntity> entities) 
  {
    CollectionModel<WalletModel> models = super.toCollectionModel(entities);
    
    models.add(linkTo(methodOn(WalletController.class).getAll(null)).withRel("wallets"));
    models.add(linkTo(methodOn(WalletController.class).getAll(null)).withSelfRel());
    
    return models;
  }
}
