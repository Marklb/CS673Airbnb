import _ from 'lodash';
import React from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';

import DashboardContainer from '../dashboard-container/dashboard-container';

require("./users-edit.scss");

/*

*/
export default class UsersEdit extends React.Component {
  constructor(props) {
    super(props);


    this.state = {

    };
  }



  render() {
    return (
      <DashboardContainer headerTab='profile' >
        <div>
          Profile
        </div>
      </DashboardContainer>
    );
  }

  /*

  Event Callbacks

  */



};
