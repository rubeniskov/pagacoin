package com.pagantins.pagacoin;

import java.util.List;
import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;


import com.pagantins.pagacoin.model.User;

@RestController
@RequestMapping("/user")
public class UserController {
  // @Autowired
  // private UserRepository repository;

  @RequestMapping("/")
  public List<User> findAll() {
    List<User> users = new ArrayList<User>();

    users.add(new User());
    users.add(new User());
    users.add(new User());
    return users;
    // return repository.findAll();
	}


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
}
