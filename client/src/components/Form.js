import React from 'react';

const Form = props => {
    return(
        <form onSubmit={e => props.handleSubmit(e)}>
            <input
                name="username"
                type="text"
                onChange={e => props.handleChange(e)}
                value={props.username}
            />
            <input
                name="password"
                type="password"
                onChange={e => props.handleChange(e)}
                value={props.password}
            />
            <button>Submit</button>
        </form>
    )
}

export default Form;