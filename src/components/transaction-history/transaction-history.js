import React from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';

// Javascript Modules
import $ from 'jquery';
import UserSessionHandler from '../../user-session-handler';

// React Components
import DashboardContainer from '../dashboard-container';

require("./transaction-history.scss");

/*

*/
export default class TransactionHistory extends React.Component {
  static contextTypes = {
    userSessionHandler: React.PropTypes.instanceOf(UserSessionHandler).isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {

    };

  }

  componentDidMount() {
    $.get('/api/get_user_reservations', [], {

    });
  }

  render() {
    return (
      <DashboardContainer headerTab='account' >
        <div>

        </div>
      </DashboardContainer>
    );
  }

  /*

  Event Callbacks

  */




};
