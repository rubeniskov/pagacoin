export default `
  type Wallet {
    id: ID!
    userId: String
    balance: Float
    cdate: String
  }
  type User {
    id: ID!
    firstname: String
    lastname: String
    cdate: String
  }
  type Transaction {
    id: ID!
    amount: Float
    source: String
    target: String
    status: String
    cdate: String
  }
  type MockDataStatus {
    users: Int
    wallets: Int
    transactions: Int
  }
  type Mutation {
    createUser(firstname: String, lastname: String): User
    createWallet(userId: String!, amount: Float): Wallet
    transferWalletMoney(walletId: String!, targetId: String!, amount: Float!): Wallet
    chargeWalletMoney(walletId: String!, amount: Float!): Wallet
    mockDataPopulate(minUsers: Int, maxUsers: Int, minWalletsPerUser: Int, maxWalletPerUser: Int, minTransactions: Int, maxTransactions: Int): MockDataStatus
  }
  type Query {
    wallet(walletId: String!): Wallet
    wallets(userId: String): [Wallet]
    user(userId: String!): User
    users(query: String): [User]
    transactions: [Transaction]
  }
  schema {
    query: Query
    mutation: Mutation
  }
`;


// type User {
//   id: ID!
//   username: String
//   email: String
//   posts: [Post]
// }
// type Query {
//   posts: [Post]
//   post (id: ID!): Post
//   users: [User]
//   user (id: ID!): User
// }
// type Mutation {
//   addPost(title: String!, content: String!, userId: ID!): Post!
// }
