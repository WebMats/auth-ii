import React from 'react'
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const FETCH_USERS = gql`
    query FetchUsers {
        users {
            id
            username
            department
        }
    }
`;


const users = () => (
    <Query query={FETCH_USERS}>
        {({data, loading, error}) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>ERROR: {error.message}</p>;
            return (
                <>
                    {data.users && data.users.length>0 && (
                        <ul>
                            {data.users.map(user => <li key="user.id">{user.username}</li>)}
                        </ul>
                    )}
                </>
            )
        }}
    </Query>
)

export default users
