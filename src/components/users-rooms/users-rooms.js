import React from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';

import DashboardContainer from '../dashboard-container/dashboard-container';

require("./users-rooms.scss");

/*

*/
export default class UsersRooms extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }



  render() {
    return (
      <DashboardContainer headerTab='your-listings' >
        <div>
          Your Listings
        </div>
      </DashboardContainer>
    );
  }

  /*

  Event Callbacks

  */



};
