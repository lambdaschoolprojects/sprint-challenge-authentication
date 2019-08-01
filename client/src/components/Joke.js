import React from 'react';

const Joke = props => {
    return <li className="list-group-item list-group-item-info">{  props.joke }</li>;
}

export default Joke;