import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import { HttpLink } from 'apollo-link-http';
import { ApolloClient } from 'apollo-client';
import { ApolloProvider, Query } from 'react-apollo';
import { InMemoryCache } from 'apollo-cache-inmemory';
import gql from 'graphql-tag';
import App from './App';
import Login from './pages/login';
import './index.css';

const cache = new InMemoryCache();

const client = new ApolloClient({
    cache,
    link: new HttpLink({
        uri: 'http://localhost:4000/graphql',
        headers: {
            "Authorization": `bearer ${localStorage.getItem('token')}`
        }
    })
})
cache.writeData({
    data: {
        isLoggedIn: !!localStorage.getItem('token'),
        userCredentials: {},
        users: []
    }
})

const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`;

const app = (
    <ApolloProvider client={client} >
        <BrowserRouter>
            <Query query={IS_LOGGED_IN}>
                {({ data }) => (data.isLoggedIn ? <App /> : <Login />)}
            </Query>
        </BrowserRouter>
    </ApolloProvider>
)



ReactDOM.render(app, document.getElementById('root'));

