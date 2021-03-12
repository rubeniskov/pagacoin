import { gql } from '@apollo/client';

export const MOCK_DATA_POPULATE = gql`
  mutation MockDataPopulate {
    mockDataPopulate {
      users,
      wallets,
      transactions
    }
  }
`;

export const TRANSFER_WALLET_MONEY = gql`
  mutation TransferWalletMoney($walletId: String!, $targetId: String!, $amount: Float!) {
    transferWalletMoney(walletId: $walletId, targetId: $targetId, amount: $amount) {
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
