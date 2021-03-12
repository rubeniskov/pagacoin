package com.pagantis.pagacoin.controller;

import java.util.List;
import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

import com.pagantis.pagacoin.model.UserModel;
import com.pagantis.pagacoin.entity.UserEntity;
// import com.pagantis.pagacoin.service.UserService;
import java.util.Optional;
import com.pagantis.pagacoin.repository.UserRepository;
import com.pagantis.pagacoin.service.UserService;
import com.pagantis.pagacoin.assembler.UserModelAssembler;

import org.springframework.hateoas.CollectionModel;

@RestController
@RequestMapping("/users")
public class UserController {
  
  // @Autowired
  // private UserService service;

  @Autowired
  private UserRepository repository;

  @Autowired
  private UserService service;

  @Autowired
  private UserModelAssembler assembler;

  @RequestMapping(method = RequestMethod.GET)
  public ResponseEntity<CollectionModel<UserModel>> getAll(
    @RequestParam(required = false) String query
  ) {
    List<UserEntity> users;

    if (query != null) {
      users = service.search(query);
    } else {
      users = service.findAll();
    }

    if (users.isEmpty()) {
      return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    } else {
      return new ResponseEntity<>(
        assembler.toCollectionModel(users), HttpStatus.OK);  
    }
  }

  @RequestMapping(method = RequestMethod.POST)
  public HttpEntity<UserEntity> create() {
    UserEntity user = new UserEntity("pepito", "flores");
    
    repository.save(user);

    return new ResponseEntity<UserEntity>(user, HttpStatus.OK);
  }

  @RequestMapping(value = "/{id}", method = RequestMethod.GET)
  public ResponseEntity<UserModel> getById(@PathVariable("id") String userId) {
    
    UserEntity user = (UserEntity)(repository.findById(userId).get());
    
    if (user == null) {
      return new ResponseEntity<UserModel>(HttpStatus.NOT_FOUND);
    } 

    return new ResponseEntity<UserModel>(assembler.toModel(user), HttpStatus.OK);
  }

  
}
