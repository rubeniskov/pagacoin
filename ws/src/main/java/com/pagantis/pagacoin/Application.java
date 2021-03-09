package com.pagantins.pagacoin;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.Arrays;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;

import com.pagantins.pagacoin.model.Transaction;

import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.SimpleMongoClientDbFactory;

import com.mongodb.client.MongoClients;

@SpringBootApplication
public class Application {
  public static void main(String[] args) {
    MongoOperations mongoOps = new MongoTemplate(new SimpleMongoClientDbFactory(MongoClients.create(), "database"));
    
    mongoOps.dropCollection(Transaction.class);
    
    // Insert is used to initially store the object into the database.
    mongoOps.insert(new Transaction(410, "b31d032cfdcf47a399990a71e43c5d2a", "431d032cfdcf47a399990a71e43c5d2a"));
    mongoOps.insert(new Transaction(969, "b31d032cfdcf47a399990a71e43c5d2a", "431d032cfdcf47a399990a71e43c5d2a"));
    mongoOps.insert(new Transaction(1000, "b31d032cfdcf47a399990a71e43c5d2a", "431d032cfdcf47a399990a71e43c5d2a"));
    // log.info("Insert: " + p);

    // // Find
    // p = mongoOps.findById(p.getId(), Transaction.class);
    // log.info("Found: " + p);

    // // Update
    // mongoOps.updateFirst(query(where("name").is("Joe")), update("age", 35), Transaction.class);
    // p = mongoOps.findOne(query(where("name").is("Joe")), Transaction.class);
    // log.info("Updated: " + p);

    // // Delete
    // mongoOps.remove(p);

    // Check that deletion worked
    // List<Transaction> people =  mongoOps.findAll(Transaction.class);
    // log.info("Number of people = : " + people.size());


    

    SpringApplication.run(Application.class, args);
  }
  // @Bean
	// public CommandLineRunner commandLineRunner(ApplicationContext ctx) {
	// 	return args -> {

	// 		System.out.println("Let's inspect the beans provided by Spring Boot:");

	// 		String[] beanNames = ctx.getBeanDefinitionNames();
	// 		Arrays.sort(beanNames);
	// 		for (String beanName : beanNames) {
	// 			System.out.println(beanName);
	// 		}

	// 	};
	// }
}
