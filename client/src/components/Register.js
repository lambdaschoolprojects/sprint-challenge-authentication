import React from 'react';

import Form from './Form'

const Register = props => {
    return (
        <div onLoad={props.clearState}>
            <h3>Register to see the jokes!</h3>
            <Form
                handleChange={props.handleChange}
                handleSubmit={props.handleRegister}
                username={props.username}
                password={props.password}
            />
        </div>
    );
}

export default Register;