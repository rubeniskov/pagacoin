package com.pagantins.pagacoin;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.pagantins.pagacoin.model.User;

public interface UserRepository extends MongoRepository<User, String> {

  public List<User> findAll();
}

// import com.pagantins.pagacoin.model.User;


// public class UserRepository {
//   // UserRepository(Store store) {
    
//   // }
//   // private Store store;

//   UserRepository() {
//     // this.store = new Store();
//   }

//   public User get() {
//     return new User();
//   }
// }
