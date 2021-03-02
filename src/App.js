import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Header from './components/Header.js';
import Home from './HomePage/Home.js';
import PrivateRoute from './components/PrivateRoute.js';
import SignUpPage from './Auth/SignUp,js';
import LoginPage from './Auth/LoginPage,js';
import TodosListPage from './Todos/TodoListPage,js';
import { getUserFromLocalStorage, putUserInLocalStorage } from './localStorageutils.js';

export default class App extends Component {
  state = {
    user: getUserFromLocalStorage()
  }

  handleUserChange = (user) => {
    this.setState({ user })
    
    putUserInLocalStorage(user);
  }

  handleLogout = () => {
    this.handleUserChange();
  }

  render() {
    const { user } = this.state;
      return (
          <div>
              <Router>
                <Header
                  user={this.state.user}
                  handleLogout={this.handleLogout}/>
                  <Switch>
                      <Route 
                          path="/" 
                          exact
                          render={(routerProps) => <Home {...routerProps} />} 
                      />
                      <PrivateRoute 
                          path="/todos" 
                          exact
                          token={user && user.token}
                          render={(routerProps) => 
                            <TodosListPage 
                              user={this.state.user}
                              {...routerProps} 
                            />} 
                      />
                      <Route 
                        path="/login" 
                        exact
                        render={(routerProps) => 
                          <LoginPage 
                            handleUserChange={this.handleUserChange}
                            {...routerProps} 
                          />} 
                      />
                      <Route 
                        path="/signup" 
                        exact
                        render={(routerProps) => 
                          <SignUpPage 
                            handleUserChange={this.handleUserChange}
                            {...routerProps} 
                          />} 
                      />
                  </Switch>
              </Router>
          </div>
      )
  }
}