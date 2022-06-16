const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    surveys: [Survey]
  }

  type Data {
    _id: ID
    string: String
    number: Int
    boolean: Boolean
    array: [Array]
  }

  type Array {
    _id: ID
    string: String
    bumber: Int
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    me: User
    datas: [Data]
    data(dataId: ID!): Data
    publicDatas: [Data]
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addData(question: String!, isPublic: Boolean, expireTime: String): Data
  }
`;

module.exports = typeDefs;

