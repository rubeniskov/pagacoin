import { gql } from '@apollo/client';

export const TRANSFER_WALLET_MONEY = gql`
  mutation TransferWalletMoney($walletId: String!, $targetId: String!, $amount: Float!) {
    transferWalletMoney(walletId: $walletId, targetId: $targetId, amount: $amount) {
      id,
      balance,
      cdate
    }
  }
`;

export const CREATE_WALLET = gql`
  mutation CreateWallet($userId: String!) {
    createWallet(userId: $userId) {
      id,
      balance,
      cdate
    }
  }
`;

export const CHARGE_WALLET_MONEY = gql`
  mutation ChargeWalletMoney($walletId: String!, $amount: Float!) {
    chargeWalletMoney(walletId: $walletId, amount: $amount) {
      id,
      balance,
      cdate
    }
  }
`;

export const CREATE_USER = gql`
  mutation CreateUser($firstname: String!, $lastname: String!) {
    createUser(firstname: $firstname, lastname: $lastname) {
      id,
      firstname,
      lastname,
      cdate
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser($userId: String!, $firstname: String, $lastname: String) {
    updateUser(userId: $userId, firstname: $firstname, lastname: $lastname) {
      id,
      firstname,
      lastname,
      cdate
    }
  }
`;

export const MOCK_DATA_POPULATE = gql`
  mutation MockDataPopulate {
    mockDataPopulate {
      statistics {
        users,
        wallets,
        transactions
      }
    }
  }
`;
