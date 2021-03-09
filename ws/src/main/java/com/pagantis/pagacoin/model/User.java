package com.pagantins.pagacoin.model;

import java.util.ArrayList; 
import org.springframework.data.annotation.Id;

public class User {
  @Id
  private Integer id;

  private String name;

  private String email;

  private ArrayList<String> wallets = new ArrayList<String>();

  public Integer getId() {
    return this.id;
  }

  public void setId(Integer id) {
    this.id = id;
  }

  public String getName() {
    return this.name;
  }

  public ArrayList<String> getWallets() {
    return this.wallets;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getEmail() {
    return this.email;
  }

  public void setEmail(String email) {
    this.email = email;
  }
}
