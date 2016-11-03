import React from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';

import DashboardContainer from '../dashboard-container';

require("./users-trips.scss");

/*

*/
export default class UsersTrips extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }



  render() {
    return (
      <DashboardContainer headerTab='your-trips' >
        <div>
          Your Trips
        </div>
      </DashboardContainer>
    );
  }

  /*

  Event Callbacks

  */



};
