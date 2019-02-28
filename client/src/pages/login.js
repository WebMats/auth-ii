import React from 'react'
import LoginForm from '../containers/login-form';
import { ApolloConsumer, Mutation } from 'react-apollo';
import gql from 'graphql-tag';


const LOGIN_USER = gql`
  mutation Login($username: String!, $password: String!) {
    login(userInput: {username: $username, password: $password}) {
        userId
        token
        username
        tokenExpiration
    }
  }
`;


const login = (props) => (
    <ApolloConsumer>
        {(client) => (
            <Mutation 
                mutation={LOGIN_USER}
                onCompleted={({ login }) => {
                    localStorage.setItem('token', login.token);
                    client.writeData({ data: {isLoggedIn: true, userCredentials: {...login} } })
                }}
            >
                {(login, { loading, error }) => {
                    if (loading) return <p>Loading...</p>;
                    if (error) return <p>An error occurred</p>;
                    return (
                        <LoginForm login={login} />
                    )
                }}
            </Mutation>
        )}
    </ApolloConsumer>
)

export default login
