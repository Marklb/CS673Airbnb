import React from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';

import DashboardContainer from '../dashboard-container';

require("./users-notifications.scss");

/*

*/
export default class UsersNotifications extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }



  render() {
    return (
      <DashboardContainer headerTab='account' >
        <div>
          Account
        </div>
      </DashboardContainer>
    );
  }

  /*

  Event Callbacks

  */



};
