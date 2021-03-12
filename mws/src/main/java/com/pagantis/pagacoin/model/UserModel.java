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

  // public UserModel(String name) {
  //   this.name = name;
  //   this.cdate = System.currentTimeMillis();
  // }

  // // public String getId() {
  // //   return id;
  // // }

  // @Override
  // public String toString() {
  //   return "User [id=" + id + ", name=" + name + "]";
  // }
}


// package com.pagantis.pagacoin.model;

// import java.util.ArrayList; 
// import org.springframework.data.annotation.Id;

// public class User {
//   @Id
//   private Integer id;

//   private String name;

//   private String email;

//   private ArrayList<String> wallets = new ArrayList<String>();

//   public String getId() {
//     return this.id;
//   }

//   public String getName() {
//     return this.name;
//   }

//   public ArrayList<String> getWallets() {
//     return this.wallets;
//   }

//   public void setName(String name) {
//     this.name = name;
//   }

//   public String getEmail() {
//     return this.email;
//   }

//   public void setEmail(String email) {
//     this.email = email;
//   }
// }
