import React from 'react'
import { NavLink } from 'react-router-dom'
import { ApolloConsumer } from 'react-apollo';

const header = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <a className="navbar-brand">Lambda</a>
        <button className="navbar-toggler" type="button">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarColor01">
            <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                    <NavLink to="/users" className="nav-link">Users</NavLink>
                </li>
                <ApolloConsumer>
                    {(client) => (
                        <li
                            className="nav-item"
                            onClick={() => {
                                client.writeData({ data: { isLoggedIn: false } });
                                localStorage.clear();
                            }}
                        >
                            <NavLink to="/" className="nav-link">Logout</NavLink>
                        </li>
                    )}
                </ApolloConsumer>
            </ul>
        </div>
    </nav>
  )
}

export default header
