import React from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';
import _ from 'lodash';
import $ from 'jquery';
import UserSessionHandler from '../../user-session-handler';

import DashboardContainer from '../dashboard-container';

require("./users-rooms.scss");

/*

*/
export default class UsersRooms extends React.Component {
  static contextTypes = {
	    userSessionHandler: React.PropTypes.instanceOf(UserSessionHandler).isRequired  
  };
  
  constructor(props) {
    super(props);

    this.state = {
		host_id: -1,
		result: [
			{
				place_id: 'default',
				rating: 'default',
				address: 'default',
				room_name: 'default',
				pictures: 'default',
				bookingtype_name: 'default',
				date_range_start: 'default',
				date_range_end: 'default'
			}
		]
    };
  }

  componentDidMount() {
  $.get('/api/getUserInfo', {
		authType: this.context.userSessionHandler.getAuthType(),
		authToken: this.context.userSessionHandler.getAuthToken()
	}, (data, status) => {
		console.log("data:" + data);
		console.log("user_id:" + data.user_id);
		this.state.host_id = data.user_id;
		$.post('/api/getUserListings', {
			'host_id' : this.state.host_id,
		}, (data, status) => {
			if(data.query_success === false) {
				console.log('Trip details query not successful');
			} else {
				console.log('Trip details query successful');
				this.setState({result: data.result});
			}
		});
	});
  }

  render() {
    return (
      <DashboardContainer headerTab='your-listings' >
        <div className="dashboard-layout-left-nav-layout-container">
          <h1>Your Listings</h1>
		  	<br></br>
			{this.state.result.map((val, i) => {
				return (
					<div key={i} className="f">
						Title: {val.room_name}
						<br/>
						Rating: ({val.rating}/5)
						<br/>
						<img className="pic" src={val.pictures} onClick={this.onClickShowRoom.bind(this, i)} />
						<br/>
						Address: {val.address}
						<br/>
						Booking Type: {val.bookingtype_name}
						<br/>
						Date Booked: {val.date_range_start} to {val.date_range_end}
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
  
  	onClickShowRoom(indx, e){
		var place_id = this.state.result[indx].place_id;
		console.log("place_id = " + place_id);
		let url = `/become-host/${place_id}`;
		browserHistory.push(url);
	}


};
