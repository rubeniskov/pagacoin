package com.pagantis.pagacoin.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@NoArgsConstructor
@ToString
@Document(collection = "users")
public class UserEntity {
  @Id
  private String id;
  private String firstname;
  private String lastname;
  private long cdate;

  public UserEntity(String firstname, String lastname) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.cdate = System.currentTimeMillis();
  }
}
