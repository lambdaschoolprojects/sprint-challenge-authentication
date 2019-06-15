import React, { Component } from 'react';
import { Route, NavLink, withRouter } from "react-router-dom";

import Login from './components/Login';
import Register from './components/Register';
import Jokes from './components/Jokes';

class App extends Component {
    state = {
        password: "",
        username: "",
    }

    getJokes = _ => {

    }

    handleLogin = _ => {

    }

    handleRegister = _ => {

    }

    handleChange = e => {
        e.preventDefault();

        this.setState({
            [e.target.name]: e.target.value
        });
    }

    render() {
        return (
            <div>
               <h1>Welcome to Dad Jokes!</h1>
                <ul>
                    <li>
                        <NavLink to="/login">Login</NavLink>
                    </li>
                    <li>
                        <NavLink to="/register">Register</NavLink>
                    </li>
                    <li>
                        <NavLink to="/jokes">Show me the funny!</NavLink>
                    </li>
                </ul>

                <Route
                    path="/login"
                    render={() =>
                        (<Login
                            handleChange={this.handleChange}
                            handleLogin={this.handleLogin}
                        />)}
                />
                <Route
                    path="/register"
                    render={() =>
                        (<Register
                            handleChange={this.handleChange}
                            handleRegister={this.handleRegister}
                        />)}
                />
                <Route
                    path="/jokes"
                    render={() =>
                        (<Jokes
                            getJokes={this.getJokes}
                        />)}
                />
            </div>
        );
    }
}

export default withRouter(App);