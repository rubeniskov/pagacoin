package com.pagantis.pagacoin.exception;

public class InsufficientBalanceException extends RuntimeException {
  public InsufficientBalanceException(String resourceId) {
    super(String.format("Insufficient balance for source %s", resourceId));
  }
}
