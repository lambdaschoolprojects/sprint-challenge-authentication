import React from 'react';
import { withRouter } from 'react-router-dom';

import * as tokenHelpers from './handleToken';

const withAuth = Component => {
    const Auth = props => {
        if (tokenHelpers.getToken()) {
            return <Component {...props} />
        } else {
            props.history.push('/login');
            return <div>You are not authorized</div>
        }
    }

    return withRouter(Auth);
}

export default withAuth;