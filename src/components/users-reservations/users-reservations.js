import React from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';
import _ from 'lodash';
import $ from 'jquery';
import UserSessionHandler from '../../user-session-handler';

import DashboardContainer from '../dashboard-container';

require("./users-reservations.scss");

/*

*/
export default class UsersReservations extends React.Component {
  static contextTypes = {
	  userSessionHandler: React.PropTypes.instanceOf(UserSessionHandler).isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
		clientID: -1,
		result: [
			{
				host_id: 'default',
				place_id: 'default',
                paid_date: 'default',
				room_name: 'default',
				booked_date_start: 'default',
				booked_date_end: 'default',
                client_name: 'default'
			}
		]
    }
  };

  componentDidMount() {
  $.get('/api/getUserInfo', {
		authType: this.context.userSessionHandler.getAuthType(),
		authToken: this.context.userSessionHandler.getAuthToken()
	}, (data, status) => {
		console.log("data:" + data);
		console.log("user_id:" + data.user_id);
		this.state.host_id = data.user_id;
		$.post('/api/getUserReservations', {
			'host_id' : this.state.host_id,
		}, (data, status) => {
			if(data.query_success === false) {
				console.log('Reservation details query not successful');
			} else {
				console.log('Reservation details query successful');
				this.setState({result: data.result});
			}
		});
	});
  }

  render() {
    return (
      <DashboardContainer headerTab='your-reservations' >
		<div className="roompage">
			<h1>Your Reservations</h1>
			<br></br>
			{this.state.result.map((val, i) => {
				return (
					<div key={i} className="f">
						{val.client_name} has booked {val.room_name} on {val.paid_date} for the dates {val.booked_date_start} to {val.booked_date_end}.
                        <br/>
					</div>
				);
			})}
        </div>
      </DashboardContainer>
    );
  }

    /*

  Event Callbacks

  */

};
