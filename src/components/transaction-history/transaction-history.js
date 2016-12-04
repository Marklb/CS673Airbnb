import React from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';

// Javascript Modules
import $ from 'jquery';
import UserSessionHandler from '../../user-session-handler';

// React Components
import DashboardContainer from '../dashboard-container';

require("./transaction-history.scss");

/*

*/
export default class TransactionHistory extends React.Component {
  static contextTypes = {
    userSessionHandler: React.PropTypes.instanceOf(UserSessionHandler).isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
		user_id: -1,
		result: [
			{
				room_name: 'default',
				host_name: 'default',
				client_name: 'default',
				payment_type_name: 'default',
				booked_date_start: 'default',
				booked_date_end: 'default',
				amt_paid: 'default',
				paid_date: 'default'
			}
		]
    };

  }

  componentDidMount() {
    $.get('/api/get_user_reservations', [], {
		authType: this.context.userSessionHandler.getAuthType(),
		authToken: this.context.userSessionHandler.getAuthToken()
    }, (data, status) => {
		console.log("data:" + msgs);
	});
  }

  render() {
    return (
      <DashboardContainer headerTab='account' >
        <div>
			
        </div>
      </DashboardContainer>
    );
  }

  /*

  Event Callbacks

  */




};
