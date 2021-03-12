package com.pagantis.pagacoin.exception;

public class TransactionException extends RuntimeException {
  /**
   *
   */
  private static final long serialVersionUID = 1L;

  public TransactionException(String message) {
      super(message);
  }
}
