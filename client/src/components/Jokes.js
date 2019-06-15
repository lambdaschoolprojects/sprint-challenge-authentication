import React, { Component } from 'react';
import withAuth from '../helpers/withAuth';

import Joke from './Joke';

class Jokes extends Component {
    state = {
        jokes: null
    }

    async componentDidMount() {
        const jokes = await this.props.getJokes();

        console.log(jokes);

        this.setState({ jokes });
    }

    render() {
        return (
            <div>
                {
                    this.state.jokes && this.state.jokes.map(joke => <Joke key={joke.id} {...joke} />)
                }
            </div>
        );
    }
}

export default withAuth(Jokes);