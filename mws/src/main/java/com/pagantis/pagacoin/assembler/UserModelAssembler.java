package com.pagantis.pagacoin.assembler;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;
import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.server.mvc.RepresentationModelAssemblerSupport;
import org.springframework.stereotype.Component;

import com.pagantis.pagacoin.entity.UserEntity;
import com.pagantis.pagacoin.model.UserModel;
import com.pagantis.pagacoin.controller.UserController;

@Component
public class UserModelAssembler extends RepresentationModelAssemblerSupport<UserEntity, UserModel> {
  public UserModelAssembler() {
    super(UserController.class, UserModel.class);
  }

  @Override
  public UserModel toModel(UserEntity entity) 
  {
    UserModel model = instantiateModel(entity);

    model.add(linkTo(
        methodOn(UserController.class)
        .getById(entity.getId()))
        .withSelfRel());
    
    model.setId(entity.getId());
    model.setFirstname(entity.getFirstname());
    model.setLastname(entity.getLastname());
    model.setCdate(entity.getCdate());

    return model;
  }
  
  @Override
  public CollectionModel<UserModel> toCollectionModel(Iterable<? extends UserEntity> entities) 
  {
    CollectionModel<UserModel> models = super.toCollectionModel(entities);
    
    models.add(linkTo(methodOn(UserController.class).getAll(null)).withRel("users"));
    models.add(linkTo(methodOn(UserController.class).getAll(null)).withSelfRel());
    
    return models;
  }
}
