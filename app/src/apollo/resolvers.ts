import createResolver from './createResolver';

export default {
  Query: {
    wallet: createResolver('/wallets/{walletId}'),
    wallets: createResolver('/wallets{?userId}', {
      mapResult: (result) => result.wallets
    }),
    user: createResolver('/users/{userId}'),
    users: createResolver('/users{?query}', {
      mapResult: (result) => result.users
    }),
    transactions: createResolver('/transactions', {
      mapResult: (result) => result.transactions
    }),
  },

  Mutation: {
    createUser: createResolver('/users', {
      method: 'POST'
    }),
    createWallet: createResolver('/wallets', {
      method: 'POST'
    }),
    updateUser: createResolver('/users/{userId}', {
      method: 'PATCH'
    }),
    chargeWalletMoney: createResolver('/wallets/{walletId}/charge', {
      method: 'POST'
    }),
    transferWalletMoney: createResolver('/wallets/{walletId}/transfer', {
      method: 'POST'
    }),
    mockDataPopulate: createResolver('/mock/populate', {
      method: 'POST'
    })
  },
};
