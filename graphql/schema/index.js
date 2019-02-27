const { gql } = require('apollo-server');

const typeDefs = gql`
    type UserCredentials {
        userId: ID!
        username: String!
        token: String!
        tokenExpiration: String!
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
    type Query {
        login(userInput: UserInput): UserCredentials!
        users: [User]!
    }
    type Mutation {
        signup(newUserInput: UserInput): UserCredentials!
    }
`;

module.exports = typeDefs