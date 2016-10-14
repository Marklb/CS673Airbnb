import React from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';

import DashboardContainer from '../dashboard-container/dashboard-container';

require("./dashboard.scss");

/*

*/
export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }



  render() {
    return (
      <DashboardContainer headerTab='dashboard' >
        <div>
          Dashboard
        </div>
      </DashboardContainer>
    );
  }

  /*

  Event Callbacks

  */



};
