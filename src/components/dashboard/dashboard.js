import React from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';
import _ from 'lodash';
import $ from 'jquery';
import UserSessionHandler from '../../user-session-handler';

import DashboardContainer from '../dashboard-container';

require("./dashboard.scss");

/*

*/
export default class Dashboard extends React.Component {
  static contextTypes = {
	    userSessionHandler: React.PropTypes.instanceOf(UserSessionHandler).isRequired  
  };
  
  constructor(props) {
    super(props);

    this.state = {
		user_id: -1,
		hostPendingRequestResults: [
			{
				req_id: 'default',
				place_id: 'default',
				client_id: 'default',
				client_name: 'default',
				ask_amount: 'default',
				resp_time: 'default',
				date_start: 'default',
				date_end: 'default',
				date_req: 'default',
				room_name: 'default'
			}
		],
		yourPendingRequestResults: [
			{
				req_id: 'default',
				status: 'default',
				place_id: 'default',
				client_id: 'default',
				client_name: 'default',
				ask_amount: 'default',
				resp_time: 'default',
				date_start: 'default',
				date_end: 'default',
				date_req: 'default',
				room_name: 'default'			
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
			this.state.user_id = data.user_id;
			$.post('/api/hostPendingRequests', { //req_id, place_id, client_id, client_name, ask_amount, resp_time, date_start, date_end, date_req, room_name
				'user_id' : this.state.user_id
			}, (data, status) => {
				if(data.query_success === false) {
					console.log('get Dashboard Info query not successful');
				} else {
					console.log('get Dashboard Info details query successful');
					this.setState({hostPendingRequestResults: data.result});
					console.log("hostPendingRequestResults[0].req_id = " + data.hostPendingRequestResults[0].req_id);
				}
			});
			$.post('/api/clientPendingRequests', { //req_id, place_id, client_id, client_name, ask_amount, resp_time, date_start, date_end, date_req, room_name
				'user_id' : this.state.user_id
			}, (data, status) => {
				if(data.query_success === false) {
					console.log('get Dashboard Info query not successful');
				} else {
					console.log('get Dashboard Info details query successful');
					this.setState({yourPendingRequestResults: data.result});
					console.log("yourPendingRequestResults[0].req_id = " + data.yourPendingRequestResults[0].req_id);
				}
			});
		});
	}

  render() {
    return (
      <DashboardContainer headerTab='dashboard' >
        <div className="dashboard-panels">

          <div className="dashboard-group">
            <div className="dashboard-group-title">Client Pending Requests for one of your places...</div>
            <div className="dashboard-subgroup">
              <div className="dashboard-subgroup-title">
			  {this.showHostPendingRequests()}
              </div>
              <div className="dashboard-items-container"></div>
            </div>
		  </div>
		  
          <div className="dashboard-group">
            <div className="dashboard-group-title">Your Pending Requests for a place by another</div>
            <div className="dashboard-subgroup">
              <div className="dashboard-subgroup-title">
			  {this.showPendingRequests()}
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
				{this.showReservations()}
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
				
	showHostPendingRequests() {
		if (this.state.hostPendingRequestResults.length > 0) {
			var today = new Date();
			return (
				<div>
				{this.state.hostPendingRequestResults.map((val, i) => {
					var date_req = new Date(val.date_req);
					//var days_remaining = new Date(date_req.getTime() + resp_time.getTime() - today.getTime());
					console.log("today: " + today);
					console.log("date_req before: " + date_req)
					date_req.setDate(date_req.getDate() + val.resp_time);
					console.log("plus: " + val.resp_time)
					console.log("date_req after: " + date_req);
					var days_remaining = date_req.getDate() - today.getDate();
					console.log("days_remaining: " + days_remaining);
					//console.log(days_remaining); 
					return (
					<div key={i} className="f">
						Booking Request from {val.client_name} on {val.date_req}, {days_remaining} days left to respond:<br/>
						{val.room_name} from {val.date_start} to {val.date_end} for ${val.ask_amount}.
						<br/>
						<button type="button" id={val.req_id} value="accept" onClick={this.runSQL.bind(this)}>Accept</button> or 
						<button type="button" id={val.req_id} value="reject" onClick={this.runSQL.bind(this)}>Reject</button>
					</div>
					);
				})}
				</div>
			);
		} else {
			return (
				<div>
					You have no client requests for one of your places right now.
				</div>
			);
		}
	}

	showPendingRequests() {
		if (this.state.yourPendingRequestResults.length > 0) {
			var today = new Date();
			return (
				<div>
				{this.state.yourPendingRequestResults.map((val, i) => {
					var date_req = new Date(val.date_req);
					//var days_remaining = new Date(date_req.getTime() + resp_time.getTime() - today.getTime());
					console.log("today: " + today);
					console.log("date_req before: " + date_req)
					date_req.setDate(date_req.getDate() + val.resp_time);
					console.log("plus: " + val.resp_time)
					console.log("date_req after: " + date_req);
					var days_remaining = date_req.getDate() - today.getDate();
					console.log("days_remaining: " + days_remaining);
					//console.log(days_remaining); 
					return (
					<div key={i} className="f">
						Your Request on {val.date_req} for {val.room_name} from {val.date_start} to {val.date_end} at ${val.ask_amount} 
						{val.status === 'pending' ? " is pending, and has " + days_remaining + " days left for a response." : " has been " + val.status + "."}
						<br/> 
						{val.status === 'pending' ? <button type="button" id={val.req_id} value="cancel" onClick={this.runSQL.bind(this)}>Cancel</button> : ""}
					</div>
					);
				})}
				</div>
			);
		} else {
			return (
				<div>
					You have no pending requests for any places right now.
				</div>
			);
		}
	}
	
	runSQL(e) {
		var id = e.target.id;
		var val = e.target.value;
		console.log(id);
		console.log(val);
		$.post('/api/updateRequest', {
			id,
			val
		}, (data, status) => {
			if(data.query_success === false) {
				console.log('Request Update not successful');
			} else {
				console.log('Request Update successful');
				if (val === "cancel") {
					this.setState({yourPendingRequestResults: data.result});
				} else {
					this.setState({hostPendingRequestResults: data.result});
				}
			}
		});
	}
  
	showReservations() {
		
		return (
			<div>
				You have no reservations at this time.
			</div>
		);
	}

};
