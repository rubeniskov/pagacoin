package com.pagantis.pagacoin.exception;

public class NotFoundException extends RuntimeException {
  public NotFoundException(String name) {
      super(String.format("%s not found", name));
  }
}
