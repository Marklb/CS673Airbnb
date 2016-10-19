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
        <div className="dashboard-panels">

          <div className="dashboard-group">
            <div className="dashboard-group-title">Pending</div>
            <div className="dashboard-subgroup">
              <div className="dashboard-subgroup-title">
                You have no pending items to respond to right now.
              </div>
              <div className="dashboard-items-container"></div>

            </div>

            <div className="dashboard-subgroup">
              <div className="dashboard-subgroup-title">Alerts</div>
              <div className="dashboard-items-container"></div>

            </div>
          </div>

          <div className="dashboard-group">
            <div className="dashboard-group-title">Reservations</div>
              <div className="dashboard-subgroup">
                <div className="dashboard-subgroup-title">
                  You have no upcoming reservations at this time.
                </div>
                <div className="dashboard-items-container"></div>

              </div>
          </div>

        </div>
      </DashboardContainer>
    );
  }

  /*

  Event Callbacks

  */



};
