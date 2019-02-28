import React from 'react'
import { ApolloConsumer, Mutation } from 'react-apollo';
import gql from 'graphql-tag';


const LOGIN_USER = gql`
  mutation Login($email: String!) {
    login(email: $email)
  }
`;


const login = (props) => (
    <ApolloConsumer>
        {(client) => (
            <Mutation 
                mutation={LOGIN_USER}
                onCompleted={(data) => {
                    console.log(data)
                    // localStorage.setItem('token', login);
                    // client.writeData({ data: {isLoggedIn: true } })
                }}
            >
                {({ data, loading, error }) => {
                    if (loading) return <p>Loading...</p>;
                    if (error) return <p>An error occurred</p>;
                    return (
                        <h1>Login Form Page</h1>
                    )
                }}
            </Mutation>
        )}
    </ApolloConsumer>
)

export default login
