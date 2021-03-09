package com.pagantins.pagacoin.service.impl;

import com.pagantins.pagacoin.model.Transaction;
import com.pagantins.pagacoin.repository.TransactionRepository;
import com.pagantins.pagacoin.service.TransactionService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TransactionServiceImpl implements TransactionService {

    @Autowired
    private TransactionRepository repository;

    @Override
    public Transaction findById(String transactionId) {
        return repository.findOne(Example.of(transactionId));
    }

    @Override
    public List<Transaction> findAll() {
        return repository.findAll();
    }
    // @Override
    // public Employee saveEmployee(Employee e) {
    //     return repository.save(e);
    // }


    // @Override
    // public void deleteByEmployeeId(String employeeId) {
    //     employeeRepository.delete(employeeId);
    // }

    // @Override
    // public void updateEmployee(Employee e) {
    //     employeeRepository.save(e);
    // }

    // @Override
    // public boolean employeeExists(Employee e) {
    //     return employeeRepository.exists(Example.of(e));
    // }
}
