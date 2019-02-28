import React, { Component } from 'react';
import UsersPage from './pages/users';
import Header from './components/header';
import { Switch, Redirect, Route } from 'react-router-dom';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Switch>
          <Redirect from="/" exact to="/users" />
          <Route path="/users" component={UsersPage} />
          <Redirect to="/users" />
        </Switch>
      </div>
    );
  }
}

export default App;
