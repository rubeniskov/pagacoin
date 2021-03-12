package com.pagantis.pagacoin.exception;

public class CyclicReferenceException extends RuntimeException {
  public CyclicReferenceException(String name, String id) {
    super(String.format("%s can't be referenced by itself with the id %s", name, id));
  }
}
