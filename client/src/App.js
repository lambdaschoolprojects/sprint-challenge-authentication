import React, { Component } from 'react';
import { Route, NavLink, withRouter } from "react-router-dom";

import Login from './components/Login';
import Register from './components/Register';
import Jokes from './components/Jokes';

import api from './helpers/api';
import * as tokenHelper from './helpers/handleToken';

class App extends Component {
    state = {
        password: "",
        username: "",
    }

    getJokes = async _ => {
        const jokes = await api.get('/jokes');

        return jokes.data;
    }

    handleLogin = async e => {
        e.preventDefault();

        const { username, password } = this.state;

        try {
            const result = await api.post("/login", {
                username,
                password
            })
            if(result.status === 200) {
                tokenHelper.setToken(result.data.token);
                this.props.history.push('/jokes');
            } else {
                console.log(result);
            }
        } catch(err) {
            console.log(err);
        } finally {
            this.clearState();
        }

    }

    handleRegister = async e => {
        e.preventDefault();

        const { username, password } = this.state;

        try {
            const result = await api.post("/register", {
                username, password
            });

            if(result) console.log(result);
        } catch (err) {
            console.log(err)
        } finally {
            this.clearState();
        }
    }

    handleChange = e => {

        this.setState({
            [e.target.name]: e.target.value
        });
    }

    logout = () => {
        tokenHelper.removeToken();
        this.props.history.push('/login')
    }

    clearState = _ => {
        this.setState({
            username: "",
            password: ""
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
                    {
                        tokenHelper.getToken() &&
                        (<li>

                            <button onClick={this.logout}>Logout</button>
                        </li>)
                    }
                </ul>

                <Route
                    path="/login"
                    render={() =>
                        (<Login
                            handleChange={this.handleChange}
                            handleLogin={this.handleLogin}
                            clearState={this.clearState}
                            username={this.state.username}
                            password={this.state.password}
                        />)}
                />
                <Route
                    path="/register"
                    render={() =>
                        (<Register
                            handleChange={this.handleChange}
                            handleRegister={this.handleRegister}
                            clearState={this.clearState}
                            username={this.state.username}
                            password={this.state.password}
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