import { gql } from '@apollo/client';

export const LIST_USERS = gql`
  query GetUsers($query: String) {
    users(query: $query) {
      id,
      firstname,
      lastname
      cdate,
    }
  }
`;

export const GET_USER_BY_ID = gql`
  query GetUserById($userId: String!) {
    user(userId: $userId) {
      id,
      firstname,
      lastname
      cdate,
    }
  }
`;

export const LIST_WALLETS = gql`
  query GetUsers($userId: String) {
    wallets(userId: $userId) {
      id,
      balance,
      cdate
    }
  }
`;

export const GET_WALLET_BY_ID = gql`
  query GetWalletById($walletId: String!) {
    wallet(walletId: $walletId) {
      id,
      balance,
      cdate
    }
  }
`;

export const MOCK_DATA_STATUS = gql`
  query GetMockDataStatus {
    mockDataStatus {
      statistics {
        users,
        transactions,
        wallets
      }
    }
  }
`;

