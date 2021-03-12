package com.pagantis.pagacoin.model;

import org.springframework.hateoas.RepresentationModel;
import org.springframework.hateoas.server.core.Relation;

import lombok.Data;

@Data
@Relation(collectionRelation = "users")
public class UserModel extends RepresentationModel<UserModel> {
  private String id;
  private String firstname;
  private String lastname;
  private long cdate;
}
