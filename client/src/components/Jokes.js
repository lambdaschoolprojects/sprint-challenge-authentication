import React, { Component } from 'react';
import withAuth from '../helpers/withAuth';

import Joke from './Joke';

class Jokes extends Component {
    state = {
        jokes: null
    }

    async componentDidMount() {
        const jokes = await this.props.getJokes();

        this.setState({ jokes });
    }

    render() {
        return (
            <div>
                <ul className="list-group list-group-flush">
                {
                    this.state.jokes && this.state.jokes.map(joke => <Joke key={joke.id} {...joke} />)
                }
                </ul>
            </div>
        );
    }
}

export default withAuth(Jokes);