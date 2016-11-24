import React from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';
import _ from 'lodash';
import $ from 'jquery';
require("./room-page.scss");
export default class RoomPage extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			placeID : this.props.params.place_id,
			hostID: -1,
			host_name: "N/A",
			roomtype_id: -1,
			roomtype_name: "N/A",
			room_title: "N/A",
			description: "N/A",
			cost_per_night: -1,//This is the same as ask_amount in hostplacelisting?
			max_people: -1,
			bedroomsize: -1,
			bathroomsize: -1,
			numofbeds: -1,
			pictures: ["N/A"],
			//address
			street: "N/A",
			city: "N/A",
			state: "N/A",
			zip: "N/A",
			country: "N/A",
			bookingtype_id: -1,//hostplacelisting
			bookingtype_name: "N/A",//bookingtype
			//for all types of booking (date availabilities)
			date_range_start: "N/A",//hostplacelisting
			date_range_end: "N/A",//hostplacelisting
			booked_dates: ["N/A"],//hostplacelisting
			//if host-set time frame
			response_time: "N/A",//hostplacelisting
			//if instant book, user-set/host-set time frame
			ask_amount: -1,//hostplacelisting
			//if not auction, create html components for date_start and date_end to insert into clientplacerequest. additionally, if user-set time frame, create html components for resp_time as well.
			//if auction
			auction_id: -1,//auction
			starting_price: -1,//auction
			current_price: -1,//auction
			sold_price: -1//auction
		};
		console.log("place_id = " + this.props.params.place_id); //This isn't working.
	}

	getRoomDetailsQuery(placeID) {
		$.post('/api/getRoomDetailsQuery', {
			//General place information
			'hostID': this.state.hostID,
			'host_name': this.state.name,
			'roomtype_id': this.state.roomtype_id,
			'roomtype_name': this.state.roomtype_name,
			'room_title': this.state.title,
			'description': this.state.description,
			'cost_per_night': this.state.cost_per_night,//This is the same as ask_amount in hostplacelisting?
			'max_people': this.state.max_people,
			'bedroomsize': this.state.bedroomsize,
			'bathroomsize': this.state.bathroomsize,
			'numofbeds': this.state.numofbeds,
			'pictures': this.state.pictures,
			//address
			'street': this.state.address,
			'city': this.state.city,
			'state': this.state.state,
			'zip': this.state.zip,
			'country': this.state.country,
			'bookingtype_id': this.state.bookingtype_id,//hostplacelisting
			'bookingtype_name': this.state.bookingtype_name,//bookingtype
			//for all types of booking (date availabilities)
			'date_range_start': this.state.date_range_start,//hostplacelisting
			'date_range_end': this.state.date_range_end,//hostplacelisting
			'booked_dates': this.state.booked_dates,//hostplacelisting
			//if host-set time frame
			'response_time': this.state.response_time,//hostplacelisting
			//if instant book, user-set/host-set time frame
			'ask_amount': this.state.ask_amount,//hostplacelisting
			//if not auction, create html components for date_start and date_end to insert into clientplacerequest. additionally, if user-set time frame, create html components for resp_time as well.
			//if auction
			'auction_id': this.state.auction_id,//auction
			'starting_price': this.state.starting_price,//auction
			'current_price': this.state.current_price,//auction
			'sold_price': this.state.sold_price,//auction
			/*'amenity' : //create list of amenities that exist at place
			[
					{name : 'Wireless Internet', checked : false},
					{name : 'Pool', checked : false},
					{name : 'Kitchen', checked : false},
					{name : '24-hour check-in', checked : false},
					{name : 'Air conditioning', checked : false},
					{name : 'Buzzer/wireless intercom', checked : false},
					{name : 'Cable TV', checked : false},
					{name : 'Carbon monoxide detector', checked : false},
					{name : 'Doorman', checked : false},
					{name : 'Doorman Entry', checked : false},
					{name : 'Dryer', checked : false},
					{name : 'Elevator in building', checked : false},
					{name : 'Essentials', checked : false},
					{name : 'Family/kid friendly', checked : false},
					{name : 'Fire extinguisher', checked : false},
					{name : 'First aid kit', checked : false},
					{name : 'Free parking on premises', checked : false},
					{name : 'Free parking on street', checked : false},
					{name : 'Gym', checked : false},
					{name : 'Hair dryer', checked : false},
					{name : 'Hangers', checked : false},
					{name : 'Heating', checked : false},
					{name : 'Hot tub', checked : false},
					{name : 'Indoor fireplace', checked : false},
					{name : 'Internet', checked : false},
					{name : 'Iron', checked : false},
					{name : 'Keypad', checked : false},
					{name : 'Laptop friendly workspace', checked : false},
					{name : 'Lock on bedroom door', checked : false},
					{name : 'Lockbox', checked : false},
					{name : 'Pets allowed', checked : false},
					{name : 'Safety card', checked : false},
					{name : 'Shampoo', checked : false},
					{name : 'Smartlock', checked : false},
					{name : 'Smoke detector', checked : false},
					{name : 'Smoking allowed', checked : false},
					{name : 'Suitable for events', checked : false},
					{name : 'TV', checked : false},
					{name : 'Washer', checked : false},
					{name : 'Wheelchair accessible', checked : false}
				],*/

				/*hostlanguage: //create list of languages that host of place knows
				[
					{name : 'English', checked : false},
					{name : 'Español', checked : false},
					{name : 'Français', checked : false},
					{name : 'Bahasa Indonesia', checked : false},
					{name : 'Bahasa Malaysia', checked : false},
					{name : 'Bengali', checked : false},
					{name : 'Dansk', checked : false},
					{name : 'Deutsch', checked : false},
					{name : 'Hindi', checked : false},
					{name : 'Italiano', checked : false},
					{name : 'Magyar', checked : false},
					{name : 'Nederlands', checked : false},
					{name : 'Norsk', checked : false},
					{name : 'Polski', checked : false},
					{name : 'Português', checked : false},
					{name : 'Punjabi', checked : false},
					{name : 'Sign Language', checked : false},
					{name : 'Suomi', checked : false},
					{name : 'Svenska', checked : false}
				],*/

			/*this.rooms = //grab list of pictures that exist at place, using this.state.pictures for img's
			[
				{img: "/images/room1.jpg", title: "room1", price: "$100", roomType: "private"},
				{img: "/images/room2.jpg", title: "room1", price: "$100", roomType: "private"},
				{img: "/images/room3.jpg", title: "room1", price: "$100", roomType: "private"}
			];*/
  		}, (data, status) => {
  			if(data.query_success === false) {
				console.log('Place details query not successful');
			} else {
				console.log('Place details query successful');
				this.setState({result: data.result});
			}
  		});
	}

	render() {
		this.getRoomDetailsQuery(this.state.placeID);
		return (
			<div>Room { this.state.placeID } display page</div>
		);
	}
}
