import React from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';

// Javascript modules
import _ from 'lodash';
import $ from 'jquery';
import UserSessionHandler from '../../user-session-handler';

// React Components
import ReactDisqusThread from 'react-disqus-thread';

require("./room-page.scss");
export default class RoomPage extends React.Component {
	static contextTypes = {
		userSessionHandler: React.PropTypes.instanceOf(UserSessionHandler).isRequired
	};

	constructor(props) {
		super(props);

		var p_id = this.props.params.pidanddate.split("_")[0];
		var d_date_check_in = this.props.params.pidanddate.split("_")[1];
		var d_date_check_out = this.props.params.pidanddate.split("_")[2];
		this.state = {
			bid_update : false,
			payMethod: 'credit',
			submit: false,
			clientID: -1,
			default_check_in_date: d_date_check_in,
			default_check_out_date: d_date_check_out,
			shortname: null,
			identifier: null,
			title: null,
			url: null,
			category_id: null,
			onNewComment: null,
			placeID : p_id,
			hostID: -1,
			host_name: "N/A",
			roomtype_id: -1,
			roomtype_name: "N/A",
			room_title: "N/A",
			description: "N/A",
			cost_per_night: -1,//This is the same as ask_amount in hostplacelisting?
			rating: -1,
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
			sold_price: -1,//auction

			//result
			result: [
				{
					clientID: 'default',
					roomtype_id: 'default',
					bookingtype_id: 'default',
					addr_id: 'default',
					place_id: 'default',
					host_id: 'default',
					host_name: 'default',
					description: 'default',
					cost_per_night: 'default',
					rating: 'default',
					max_people: 'default',
					bedroomsize: 'default',
					bathroomsize: 'default',
					numofbeds: 'default',
					pictures: 'default',
					ask_amount: 'default',
					date_range_start: 'default',
					date_range_end: 'default',
					booked_dates: 'default',
					response_time: 'default',
					active: 'default',
					rating: 'default',
					street: 'default',
					city: 'default',
					state: 'default',
					zip: 'default',
					country: 'default',
					bookingtype_name: 'default',
					roomtype_name: 'default',
					auction_id: 'default',
					starting_price: 'default',
					current_price: 'default',
					sold_price: 'default',
					gender: 'default',
					birth_date: 'default',
					profile_pic: 'default',
					bio: 'default',
					join_date: 'default',
					languages: 'default',
					amenities: 'default'
				}
			],

			bookCheckinRangeOK : true,
			bookCheckinTime : d_date_check_in,
			bookCheckoutRangeOK : true,
			bookCheckoutTime : d_date_check_out,
			bookButtonOK : true
		};
		this.getRoomDetailsQuery(this.state.placeID);
	}

	componentDidMount() {
	  	$.get('/api/getUserInfo', {
			authType: this.context.userSessionHandler.getAuthType(),
			authToken: this.context.userSessionHandler.getAuthToken()
		}, (data, status) => {
			console.log("user_id" + data.user_id);
			this.state.clientID = data.user_id;
		});


		//----------------------------
		// Disqus script start
		//----------------------------
		/**
		*  RECOMMENDED CONFIGURATION VARIABLES: EDIT AND UNCOMMENT THE SECTION BELOW TO INSERT DYNAMIC VALUES FROM YOUR PLATFORM OR CMS.
		*  LEARN WHY DEFINING THESE VARIABLES IS IMPORTANT: https://disqus.com/admin/universalcode/#configuration-variables*/
		var disqus_config = function () {
			this.page.url = '//www.jeremyhoc.com/mokbnb';
			this.page.identifier = 'mokbnb-room-${this.state.placeID}';
		};

		(function() { // DON'T EDIT BELOW THIS LINE
			var d = document, s = d.createElement('script');
			s.src = '//mokbnb-1.disqus.com/embed.js';
			s.setAttribute('data-timestamp', +new Date());
			(d.head || d.body).appendChild(s);
		})();
		//----------------------------
		// Disqus script end
		//----------------------------
	}

	componentWillReceiveProps(nextProps) {
		var new_p_id = nextProps.params.pidanddate.split("_")[0];
		if (new_p_id !== this.state.placeID) {
			this.setState({placeID: new_p_id});
			this.getRoomDetailsQuery(new_p_id);
		}
	}

	getRoomDetailsQuery(placeID) {
		$.post('/api/getRoomDetailsQuery', {
			//General place information
			'placeID' : this.state.placeID,
			'hostID': this.state.hostID,
			'host_name': this.state.host_name,
			'roomtype_id': this.state.roomtype_id,
			'roomtype_name': this.state.roomtype_name,
			'room_title': this.state.name,
			'description': this.state.description,
			'cost_per_night': this.state.cost_per_night,//This is the same as ask_amount in hostplacelisting?
			'rating': this.state.rating,
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
  		}, (data, status) => {
  			if(data.query_success === false) {
				console.log('Place details query not successful');
			} else {
				console.log('Place details query successful');
				this.setState({result: data.result});
			}
  		});
	}

	instantInsertReservationQuery(placeID) {
		var currentdate = new Date(); 
		var datetime = currentdate.getFullYear() + "-" + (((currentdate.getMonth()+1) < 10)?"0":"") + (currentdate.getMonth()+1)  + "-" + ((currentdate.getDate() < 10)?"0":"") + currentdate.getDate();
		console.log("current day : " + datetime);
		$.post('/api/addreservation', {
			//General place information
			'place_id' : this.state.placeID,
			'host_id' : this.state.result[0].host_id,
			'client_id' : this.state.clientID,
			'payment_type_id' : '1',
			'booked_date_start' : this.state.bookCheckinTime,
			'booked_date_end' : this.state.bookCheckoutTime,
			'amt_paid' : this.state.result[0].cost_per_night,
			'paid_date' : datetime
  		}, (data, status) => {
  			if(data.query_success === false) {
				console.log('insert reservation not successful');
			} else {
				console.log('insert reservation successful');
				this.setState({result: data.result});
			}
  		});
	}

	render() {
    // this.ref.roomElem
		return (
			<div className="roompage">
				<h1 ref="roomElem">Room { this.state.placeID } display page</h1>
				<br></br>
				<img src={this.state.result[0].pictures} />
				<br></br>
				Title : {this.state.result[0].name}
				<br></br>
				Description : {this.state.result[0].description}
				<br></br>
				Cost per night : {this.state.result[0].cost_per_night}
				<br></br>
				Rating : {this.state.result[0].rating}/5
				<br></br>
				Max people : {this.state.result[0].max_people}
				<br></br>
				Number of bedroom : {this.state.result[0].bedroomsize}
				<br></br>
				Number of bathroom : {this.state.result[0].bathroomsize}
				<br></br>
				Number of bed : {this.state.result[0].numofbeds}
				<br></br>
				Start date : {this.state.result[0].date_range_start}
				<br></br>
				End date : {this.state.result[0].date_range_end}
				<br></br>
				Address : {this.state.result[0].street}, {this.state.result[0].city}, {this.state.result[0].state}, {this.state.result[0].zip}, {this.state.result[0].country}
				<br></br>
				Room type : {this.state.result[0].roomtype_name}
				<br></br>
				Host name : {this.state.result[0].host_name}
				<br></br>
				Host languages : {this.state.result[0].languages}
				<br></br>
				Amenities : {this.state.result[0].amenities}
				<br></br>
				<br></br>
				Booking type ({this.state.result[0].bookingtype_name})
				{!(this.state.submit)? this.renderBooking(): null}
				{(this.state.submit)? this.renderPayment() : null}


				{/* Disqus example start */}
				<div id="disqus_thread"></div>
				<noscript>Please enable JavaScript to view the <a href="https://disqus.com/?ref_noscript">comments powered by Disqus.</a></noscript>
				{/* Disqus example end */}
			</div>
		);
	}

	renderPayment() {
		return (
			<div>
				<div>
					<input type="radio" name="credit" value="credit" checked={this.state.payMethod === 'credit'} onChange={this.onChange.bind(this)}/> Credit
					<input type="radio" name="debit" value="debit" checked={this.state.payMethod === 'debit'} onChange={this.onChange.bind(this)}/> Debit
				</div>
				<button type="button" onClick={this.onClickPay.bind(this)}>Pay!!</button>
			</div>
		);
	}
	

	renderBooking() {
		if (this.state.result[0].bookingtype_id == "1") {
			return (this.instantBooking());
		} else if (this.state.result[0].bookingtype_id == "2" && this.state.result[0].active == 'no') {
			return (this.auctionBooking());
		} else if (this.state.result[0].bookingtype_id == "2" && this.state.result[0].active == 'no') {
			return (this.auctionNotAvailable());
		} else if (this.state.result[0].bookingtype_id == "3") {
			return (this.userSetTimeFrameBooking());
		} else if (this.state.result[0].bookingtype_id == "4") {
			return (this.hostSetTimeFrameBooking());
		}
	}

	instantBooking() {
		return (
			<div>
				Check in<input name='book_check_in' type="date" defaultValue={this.state.default_check_in_date} onChange={this.onChange.bind(this)}></input>
				Check out<input name='book_check_out' type="date" defaultValue={this.state.default_check_out_date} onChange={this.onChange.bind(this)}></input>
				<br></br>
				{(this.state.bookButtonOK)? this.renderingInstantBookingButton() : "please select dates in correct range!"}
			</div>
		);
	}

	renderingInstantBookingButton() {
		return (
			<div>
				<button type="button" onClick={this.onClickInstantBooking.bind(this)}>Instant book!!</button>
			</div>
		);
	}

	renderingUserSetTimeFrameBookingButton() {
		return (
			<div>
				<button type="button">Set!!</button>
			</div>
		);
	}

	auctionBooking() {
		return (
			<div>
				Starting price: {this.state.result[0].starting_price}
				<br></br>
				Current bid: {this.state.result[0].current_price}
				<br></br>
				Bid end date : {this.state.result[0].date_range_end}
				<br></br>
				Your Bid<input type="text"></input> {this.state.bid_update ? "(your bid is updated)" : ""}
				<br></br>
				{!this.state.bid_update ? <button type="button" onClick={this.onClickAuctionBooking.bind(this)}>Submit</button> : ""}
			</div>
		);
	}

	auctionNotAvailable() {
		return (
			<div>
				Starting price : {this.state.result[0].starting_price}
				<br></br>
				Current bid : {this.state.result[0].current_price}
				<br></br>
				Bid end date : {this.state.result[0].date_range_end}
			</div>
		);
	}

	userSetTimeFrameBooking() {
		return (
			<div>
				Check in<input name='book_check_in' type="date" defaultValue={this.state.default_check_in_date} onChange={this.onChange.bind(this)}></input>
				Check out<input name='book_check_out' type="date" defaultValue={this.state.default_check_out_date} onChange={this.onChange.bind(this)}></input>
				response time<input name='book_check_response' type="date"></input>
				<br></br>
				{(this.state.bookButtonOK)? this.renderingUserSetTimeFrameBookingButton() : "please select dates in correct range!"}
			</div>
		);
	}

	hostSetTimeFrameBooking() {
		return (
			<div>
				Check in<input name='book_check_in' type="date" defaultValue={this.state.default_check_in_date} onChange={this.onChange.bind(this)}></input>
				Check out<input name='book_check_out' type="date" defaultValue={this.state.default_check_out_date} onChange={this.onChange.bind(this)}></input>
				response time<input name='book_check_response' type="date"></input>
				<br></br>
				{(this.state.bookButtonOK)? this.renderingUserSetTimeFrameBookingButton() : "please select dates in correct range!"}
			</div>
		);
	}

	onChange(e){
		var name = e.target.name;
		var val = e.target.value;
		var type = e.target.type;
		if (this.state.result[0].bookingtype_id == "1" && type == "date") {
			var date = new Date(val);
			this.checkBookDate(date, name, val);
		} else if (this.state.result[0].bookingtype_id == "3" && type == "date") {
			var date = new Date(val);
			this.checkBookDate(date, name, val);
		} else if (this.state.result[0].bookingtype_id == "4" && type == "date") {
			var date = new Date(val);
			this.checkBookDate(date, name, val);
		} else if (type == "radio" && name == 'credit') {
			this.setState({payMethod: 'credit'});
		} else if (type == "radio" && name == 'debit') {
			this.setState({payMethod: 'debit'});
		}
	}

	checkBookDate(date, name, val){
		var start = new Date(this.state.result[0].date_range_start);
		var end = new Date(this.state.result[0].date_range_end);
		var timeDiffStart = date.getTime() - start.getTime();
		var timeDiffEnd = date.getTime() - end.getTime();
		var timeInHostRange = false;
		if (timeDiffStart >= 0 && timeDiffEnd <= 0) {
			console.log("time in range");
			timeInHostRange = true;
		}
		if (name == "book_check_in") {
			console.log("check date in check in");
			var outTime = new Date(this.state.bookCheckoutTime);
			var timeDiffOut	= date.getTime() - outTime.getTime();
			this.setState({bookCheckinTime: val});
			if (timeInHostRange) {
				this.setState({bookCheckinRangeOK: true});
			} else {
				this.setState({bookCheckinRangeOK: false});
			}
			if (timeInHostRange && this.state.bookCheckoutRangeOK && timeDiffOut <= 0) {
				this.setState({bookButtonOK: true});
			} else {
				this.setState({bookButtonOK: false});
			}
		} else if (name == "book_check_out") {
			console.log("check date in check out");
			var inTime = new Date(this.state.bookCheckinTime);
			var timeDiffIn	= date.getTime() - inTime.getTime();
			this.setState({bookCheckoutTime: val});
			if (timeInHostRange) {
				this.setState({bookCheckoutRangeOK: true});
			} else {
				this.setState({bookCheckoutRangeOK: false});
			}
			if (timeInHostRange && this.state.bookCheckinRangeOK && timeDiffIn >= 0) {
				this.setState({bookButtonOK: true});
			} else {
				this.setState({bookButtonOK: false});
			}
		}
	}

	onClickInstantBooking() {
		this.setState({submit: true});
	}

	onClickAuctionBooking() {
		this.setState({bid_update: true});
	}

	onClickPay() {
		this.componentDidMount();
	}
}
