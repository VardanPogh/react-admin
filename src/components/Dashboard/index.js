import React from 'react'
import {Redirect, withRouter} from "react-router-dom";
import PropTypes from 'prop-types';


class Dashboard extends React.Component {

    render() {
        return (
            <Redirect to={{ pathname: '/login' }} />
        )
    }
}

Dashboard.propTypes = {
    window: PropTypes.func,
};

export default withRouter(Dashboard);;