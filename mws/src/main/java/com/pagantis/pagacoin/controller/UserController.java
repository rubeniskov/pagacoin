package com.pagantis.pagacoin.controller;

// Core
import java.util.List;
import java.util.ArrayList;
import java.util.Optional;
// Springboot
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;
import org.springframework.hateoas.CollectionModel;
// Models
import com.pagantis.pagacoin.model.UserModel;
import com.pagantis.pagacoin.model.UserPayloadModel;
//Entities
import com.pagantis.pagacoin.entity.UserEntity;
// Repositories
import com.pagantis.pagacoin.repository.UserRepository;
// Services
import com.pagantis.pagacoin.service.UserService;
// Assemblers
import com.pagantis.pagacoin.assembler.UserModelAssembler;

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
  public HttpEntity<UserEntity> create(@RequestBody UserPayloadModel payload) {
    UserEntity user = new UserEntity(payload.getFirstname(), payload.getLastname());
    
    repository.save(user);

    return new ResponseEntity<UserEntity>(user, HttpStatus.OK);
  }

  @RequestMapping(value = "/{id}", method = RequestMethod.PATCH)
  public HttpEntity<UserEntity> update(
    @PathVariable("id") String userId,
    @RequestBody UserPayloadModel payload) {
    UserEntity user = service.findById(userId);

    if (payload.getFirstname() != null) {
      user.setFirstname(payload.getFirstname());
    }

    if (payload.getFirstname() != null) {
      user.setLastname(payload.getLastname());
    }

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
