import React from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';
import _ from 'lodash';
import $ from 'jquery';
import UserSessionHandler from '../../user-session-handler';

import DashboardContainer from '../dashboard-container';
import Rater from 'react-rater';

require("./users-trips.scss");
/*

*/
export default class UsersTrips extends React.Component {
  static contextTypes = {
	  userSessionHandler: React.PropTypes.instanceOf(UserSessionHandler).isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
		clientID: -1,
		result: [
			{
				placeID: 'default',
                rating: 'rating',
				room_name: 'default',
				pictures: 'default',
				booked_date_start: 'default',
				booked_date_end: 'default'
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
		this.state.clientID = data.user_id;
		$.post('/api/getUserTrips', {
			'clientID' : this.state.clientID,
			'place_ID' : this.state.placeID,
			'room_name': this.state.room_name,
			'rating': this.state.rating,
			'pictures': this.state.pictures,
			'booked_date_start': this.state.booked_date_start,
			'booked_date_end': this.state.booked_date_end
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
      <DashboardContainer headerTab='your-trips' >
		<div className="roompage">
			<h1>Your Trips</h1>
			<br></br>
			{this.state.result.map((val, i) => {
				return (
					<div key={i} className="f">
						Title: {val.room_name}
						<br/>
						<img className="pic" src={val.pictures} onClick={this.onClickShowRoom.bind(this, i)} /><br/>
						Date Booked: {val.booked_date_start} to {val.booked_date_end}<br/><br/>
                        Your Rating: <Rater rating={val.rating} onRate = {this.onChange.bind(val.place_id, {i}, this)}/>
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

    onChange(indx, i, e) {
        var rating = e.rating;
        if (e.lastRating !== void 0) {
            alert('You rated ' + e.rating);
            $.post('/api/rateTrip', {
                'place_id' : i.state.result[indx.i].place_id,
                'user_id' : i.state.clientID,
                'rating' : rating
            }, (data, status) => {
                if(data.query_success === false) {
                    console.log('Rating unsuccessful');
                } else {
                    console.log('Rating successful');
                }
            });
        }
    }

  	onClickShowRoom(indx, e){
		var place_id = this.state.result[indx].place_id;
		var lat = this.state.result[indx].latitude;
		var lng = this.state.result[indx].longitude;
		var amp = this.state.result[indx].amt_paid;
		var bds_r = new Date(this.state.result[indx].booked_date_start);
		var bds = bds_r.getFullYear() + "-" + (((bds_r.getMonth()+1) < 10)?"0":"") + (bds_r.getMonth()+1)  + "-" + ((bds_r.getDate() < 10)?"0":"") + bds_r.getDate();
		var bde_r = new Date(this.state.result[indx].booked_date_end);
		var bde = bde_r.getFullYear() + "-" + (((bde_r.getMonth()+1) < 10)?"0":"") + (bde_r.getMonth()+1)  + "-" + ((bde_r.getDate() < 10)?"0":"") + bde_r.getDate();
		var yt = 'yourtrips'
		console.log("lat = " + lat);
		console.log("lng = " + lng);
		console.log("amp = " + amp);
		console.log("bds = " + bds);
		console.log("bde = " + bde);
		console.log("place_id = " + place_id);
		let url = `/roomdetail/${place_id}_${bds}_${bde}_${lat}_${lng}_${amp}_${yt}`;
		browserHistory.push(url);
	}

};
