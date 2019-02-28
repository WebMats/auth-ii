const { gql } = require('apollo-server');

const typeDefs = gql`
    type UserCredentials {
        userId: ID!
        username: String!
        token: String!
        tokenExpiration: Int!
    }
    type User {
        id: ID!
        username: String!
        department: String!
    }
    input UserInput {
        username: String!
        password: String!
    }
    input NewUserInput {
        department: String
        username: String!
        password: String!
    }
    type Query {
        users: [User]!
    }
    type Mutation {
        signup(newUserInput: NewUserInput): UserCredentials!
        login(userInput: UserInput): UserCredentials!
    }
`;

module.exports = typeDefs