import React from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';

import DashboardContainer from '../dashboard-container';

require("./inbox.scss");

/*

*/
export default class Inbox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }



  render() {
    return (
      <DashboardContainer headerTab='inbox' >
        <div>
          Inbox
        </div>
      </DashboardContainer>
    );
  }

  /*

  Event Callbacks

  */



};
