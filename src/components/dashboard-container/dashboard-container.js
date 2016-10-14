import React from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';

import DashboardPagesHeader from '../dashboard-pages-header/dashboard-pages-header';

require("./dashboard-container.scss");

/*

*/
export default class DashboardContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }



  render() {
    return (
      <div className="dashboard-container">
        <DashboardPagesHeader {...this.props} />
        <div className="dashboard-content">
          {this.props.children}
        </div>
      </div>
    );
  }

  /*

  Event Callbacks

  */



};
