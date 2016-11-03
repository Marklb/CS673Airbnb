import React from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';

import DashboardContainer from '../dashboard-container';

require("./users-settings.scss");

//
//
// Settings are in users-notifications right now
//  They wil be moved to here soon.
//
//


/*

*/
export default class UsersSettings extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }



  render() {
    return (
      <DashboardContainer headerTab='account' >
        <div>
          Settings
        </div>
      </DashboardContainer>
    );
  }

  /*

  Event Callbacks

  */



};
