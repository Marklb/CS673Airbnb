import _ from 'lodash';
import React from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';

import DashboardContainer from '../../dashboard-container';

require("../users-edit.scss");


/*

*/
export default class TrustAndVerifications extends React.Component {
  static propTypes = {

  };

  static defaultProps = {

  };

  constructor(props) {
    super(props);

  }

  componentDidMount() {

  }

  render() {
    return (
      <div>

        <div className="dashboard-panel">
          <div className="dashboard-panel-body">


          </div>
        </div>

        <div className="dashboard-panel">
          <div className="dashboard-panel-header">Your verified info</div>
          <div className="dashboard-panel-body">


          </div>
        </div>

        <div className="dashboard-panel">
          <div className="dashboard-panel-header">Not yet verified</div>
          <div className="dashboard-panel-body">


          </div>
        </div>

      </div>
    );
  }


  /*

  Event Callbacks

  */




};
