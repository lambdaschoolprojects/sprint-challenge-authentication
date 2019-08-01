import React from 'react';
import Form from "./Form";

const Login = props => {
    return (
        <div onLoad={props.clearState}>
            <h3>Login to see the jokes!</h3>
            <Form
                handleChange={props.handleChange}
                handleSubmit={props.handleLogin}
                username={props.username}
                password={props.password}
            />
        </div>
    );
}

export default Login;