import React from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';

// Javascript modules
import _ from 'lodash';
import $ from 'jquery';
import UserSessionHandler from '../../user-session-handler';

// React Components
import ReactDisqusThread from 'react-disqus-thread';
import Rater from 'react-rater';

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
			bidSiteActive: true,
			reqOK: true,
			reservedOK: true,
			bid_update : false,
			payMethod: 'credit',
			jumpToPay: false,
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
			cost: -1,
			min_cost: -1,
			max_cost: -1,
			ask_amount: -1,
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
			response_time: 3,//place
			//if instant book, user-set/host-set time frame
			ask_amount: -1,//hostplacelisting
			//if not auction, create html components for date_start and date_end to insert into clientplacerequest. additionally, if user-set time frame, create html components for resp_time as well.
			//if auction
			auction_id: -1,//auction
			starting_price: -1,//auction
			current_price: -1,//auction
			sold_price: -1,//auction
			payment_type_id: 3, //for insertion into reservation
			bid_amount: 0,
			bid_amount_ok: false,

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
					cost: 'default',
					min_cost: 'default',
					max_cost: 'default',
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
			bookResponseOK : true,
			bookResponseTime : d_date_check_in,
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
			'placeID' : this.state.placeID
  		}, (data, status) => {
  			if(data.query_success === false) {
				console.log('Place details query not successful');
			} else {
				console.log('Place details query successful');
				console.log('data = ' + data.result.length);
				//No data return, set it overdue
				if (data.result.length === 0) {
					this.setState({bidSiteActive : false});
				} else {
					this.setState({result: data.result});
					this.setState({cost: data.result[0].cost_per_night});
					
					if (data.result[0].bookingtype_id == "1") {
						this.initialCheckReservation(this.context.userSessionHandler.getUserID(), this.state.placeID);
					} else if (data.result[0].bookingtype_id == "2") {
						if (data.result[0].active == 'yes') {
							this.initialCheckClientBid(this.context.userSessionHandler.getUserID(), data.result[0].auction_id, data.result);
						} else {
							this.setState({bidSiteActive : false});
						}
					} else if (data.result[0].bookingtype_id == "3" || data.result[0].bookingtype_id == "4") {
						this.initialCheckClientReq(this.context.userSessionHandler.getUserID(), this.state.placeID);
						this.initialCheckReservation(this.context.userSessionHandler.getUserID(), this.state.placeID);
					}
				}
			}
  		});
	}

	insertReservationQuery() {
		var currentdate = new Date();
		var datetime = currentdate.getFullYear() + "-" + (((currentdate.getMonth()+1) < 10)?"0":"") + (currentdate.getMonth()+1)  + "-" + ((currentdate.getDate() < 10)?"0":"") + currentdate.getDate();
		console.log("current day : " + datetime);
		$.post('/api/addreservation', {
			'bookingtype' : this.state.result[0].bookingtype_name,
			'place_id' : this.state.placeID,
			'host_id' : this.state.result[0].host_id,
			'client_id' : this.state.clientID,
			'payment_type_id' : this.state.payment_type_id,
			'booked_date_start' : this.state.bookCheckinTime,
			'booked_date_end' : this.state.bookCheckoutTime,
			'amt_paid' : this.state.cost,
			'paid_date' : datetime
  		}, (data, status) => {
  			if(data.query_success === false) {
				console.log('insert reservation not successful');
			} else {
				console.log('insert reservation successful');
				if (this.state.result[0].bookingtype_id == "1") {
					let url = `/trips`;
					browserHistory.push(url);
				}
			}
  		});
	}

	insertClientAuctionBids() {
		$.post('/api/addbid', {
			'auction_id' : this.state.result[0].auction_id,
			'client_id' : this.state.clientID,
			'payment_type_id' : this.state.payment_type_id,
			'bid_price' : this.state.bid_amount,
			'checkin_date' : this.state.bookCheckinTime,
			'checkout_date' : this.state.bookCheckoutTime
  		}, (data, status) => {
  			if(data.query_success === false) {
				console.log('insert ClientAuctionBids not successful');
			} else {
				console.log('insert ClientAuctionBids successful');
				// if (this.state.result[0].bookingtype_id == "2") {
					// let url = `/trips`;
					// browserHistory.push(url);
				// }
			}
  		});
	}

	UserInsertClientRequestPlace() {
		var currentdate = new Date();
		var datetime = currentdate.getFullYear() + "-" + (((currentdate.getMonth()+1) < 10)?"0":"") + (currentdate.getMonth()+1)  + "-" + ((currentdate.getDate() < 10)?"0":"") + currentdate.getDate();
		console.log('client_id : ' + this.state.clientID);
		console.log('place_id : ' + this.state.placeID);
		console.log('ask_amount : ' + this.state.cost);
		console.log('payment_type_id : ' + this.state.payment_type_id);
		console.log('resp_time : ' + this.state.response_time);
		console.log('date_start : ' + this.state.bookCheckinTime);
		console.log('date_end : ' + this.state.bookCheckoutTime);
		console.log('date_req : ' + datetime);
		console.log('date_resp : ' + 'NULL');
		console.log('status : ' + 'pending');
		$.post('/api/addclientplacereq', {
			'client_id' : this.state.clientID,
			'place_id' : this.state.placeID,
			'ask_amount' : this.state.cost,
			'payment_type_id' : this.state.payment_type_id,
			'resp_time' : this.state.response_time,
			'date_start' : this.state.bookCheckinTime,
			'date_end' : this.state.bookCheckoutTime,
			'date_req' : datetime,
			'date_resp' : 'NULL',
			'status' : 'pending'
  		}, (data, status) => {
  			if(data.query_success === false) {
				console.log('user set frame insert ClientRequest not successful');
			} else {
				console.log('user set frame insert ClientRequest successful');
				// if (this.state.result[0].bookingtype_id == "2") {
					// let url = `/trips`;
					// browserHistory.push(url);
				// }
			}
  		});
	}

	HostInsertClientRequestPlace() {
		var currentdate = new Date();
		var datetime = currentdate.getFullYear() + "-" + (((currentdate.getMonth()+1) < 10)?"0":"") + (currentdate.getMonth()+1)  + "-" + ((currentdate.getDate() < 10)?"0":"") + currentdate.getDate();
		console.log('client_id : ' + this.state.clientID);
		console.log('place_id : ' + this.state.placeID);
		console.log('ask_amount : ' + this.state.cost);
		console.log('payment_type_id : ' + this.state.payment_type_id);
		console.log('resp_time : ' + this.state.result[0].response_time);
		console.log('date_start : ' + this.state.bookCheckinTime);
		console.log('date_end : ' + this.state.bookCheckoutTime);
		console.log('date_req : ' + datetime);
		console.log('date_resp : ' + 'NULL');
		console.log('status : ' + 'pending');
		$.post('/api/addclientplacereq', {
			'client_id' : this.state.clientID,
			'place_id' : this.state.placeID,
			'ask_amount' : this.state.cost,
			'payment_type_id' : this.state.payment_type_id,
			'resp_time' : this.state.result[0].response_time,
			'date_start' : this.state.bookCheckinTime,
			'date_end' : this.state.bookCheckoutTime,
			'date_req' : datetime,
			'date_resp' : 'NULL',
			'status' : 'pending'
  		}, (data, status) => {
  			if(data.query_success === false) {
				console.log('host set frame insert ClientRequest not successful');
			} else {
				console.log('host set frame insert ClientRequest successful');
				// if (this.state.result[0].bookingtype_id == "2") {
					// let url = `/trips`;
					// browserHistory.push(url);
				// }
			}
  		});
	}

	initialCheckClientReq(client_id, place_id) {
		$.post('/api/checkclientplacereq', {
			'client_id' : client_id,
			'place_id' : place_id
  		}, (data, status) => {
  			if(data.query_success === false) {
				console.log('initial Check ClientReq not successful');
			} else {
				console.log('initial Check ClientReq successful');
				if (data.result.length >= 1) {
					console.log('already has a request');
					if (data.result[data.result.length - 1].status == 'rejected') {
						this.setState({reqOK : true});
					} else if (data.result[data.result.length - 1].status == 'accept') {
						this.setState({reqOK : false});
						this.setState({reservedOK : false});
					} else if (data.result[data.result.length - 1].status == 'pending') {
						this.setState({reqOK : false});
					} else {
						this.setState({reqOK : true});
					}
				}
			}
  		});
	}

	initialCheckReservation(client_id, place_id) {
		$.post('/api/checkreservation', {
			'client_id' : client_id,
			'place_id' : place_id
  		}, (data, status) => {
  			if(data.query_success === false) {
				console.log('initial Check reservation  not successful');
			} else {
				console.log('initial Check reservation  successful');
				if (data.result.length >= 1) {
					console.log('already has a reservation');
					var book_date_end = new Date(data.result[data.result.length - 1].booked_date_end);
					var today = new Date();
					var timeDiff = book_date_end.getTime() - today.getTime();
					console.log("book_date_end = " + book_date_end);
					console.log("today = " + today);
					console.log("timeDiff = " + timeDiff);
					if (timeDiff >= 0) {
						this.setState({reservedOK : false});
					} else {
						this.setState({reservedOK : true});
					}
				}
			}
  		});
	}

	initialCheckClientBid(client_id, auction_id, result) {
		$.post('/api/checkclientbid', {
			'client_id' : client_id,
			'auction_id' : auction_id
  		}, (data, status) => {
  			if(data.query_success === false) {
				console.log('initial Check ClientBid  not successful');
			} else {
				console.log('bookingtype = ', result[0].bookingtype_name);
				if (data.result.length >= 1) {
					console.log('already have bid');
					var end_auction_time = new Date(data.result[data.result.length - 1].end_auction_time);
					var today = new Date();
					var timeDiff = end_auction_time.getTime() - today.getTime();
					console.log("end_auction_time = " + end_auction_time);
					console.log("today = " + today);
					console.log("timeDiff = " + timeDiff);
					if (timeDiff > 0) {
						this.setState({reservedOK : true});
					} else if (timeDiff <= 0 && data.result[data.result.length - 1].bid_price == data.result[data.result.length - 1].current_price){
						this.setState({reservedOK : false});
						var currentdate = new Date();
						var datetime = currentdate.getFullYear() + "-" + (((currentdate.getMonth()+1) < 10)?"0":"") + (currentdate.getMonth()+1)  + "-" + ((currentdate.getDate() < 10)?"0":"") + currentdate.getDate();
						console.log("current day : " + datetime);
						$.post('/api/addreservation', {
							'bookingtype' : result[0].bookingtype_name,
							'place_id' : this.state.placeID,
							'host_id' : result[0].host_id,
							'client_id' : client_id,
							'payment_type_id' : data.result[data.result.length - 1].payment_type_id,
							'booked_date_start' : data.result[data.result.length - 1].checkin_date,
							'booked_date_end' : data.result[data.result.length - 1].checkout_date,
							'amt_paid' : data.result[data.result.length - 1].bid_price,
							'paid_date' : datetime
						}, (data, status) => {
							if(data.query_success === false) {
								console.log('bid insert reservation not successful');
							} else {
								console.log('bid insert reservation successful');
							}
						});
					}
				}
			}
  		});
	}

	render() {
		return (
			<div>
				{this.state.bidSiteActive ? this.mainBody() : this.bidOverDue()}
			</div>

		);
	}

	bidOverDue() {
		return (
			<div>This site is overdue</div>
		);
	}

	mainBody() {
		return (
		    // this.ref.roomElem
			<div className="roompage">
				<h1>Room { this.state.placeID } display page</h1>
				<br></br>
				<img src={this.state.result[0].pictures} />
				<br></br>
				Title : {this.state.result[0].name}
				<br></br>
				Description : {this.state.result[0].description}
				<br></br>
				Cost per night : {this.state.result[0].cost_per_night}
				<br></br>
				Rating : <Rater interactive={false} rating={this.state.result[0].rating}/>
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
				{(this.state.reqOK && this.state.reservedOK)? this.bookingSection() : this.bookingStatus()}

				{/* Disqus example start */}
				<div id="disqus_thread"></div>
				<noscript>Please enable JavaScript to view the <a href="https://disqus.com/?ref_noscript">comments powered by Disqus.</a></noscript>
				{/* Disqus example end */}
			</div>
		);
	}
	
	bookingStatus() {
		var word = ""
		if (!this.state.reservedOK) {
			word = "You already have reservation on this room"
		} else if (!this.state.reqOK) {
			word = "Your request is pending"
		}
		return (
			<div>
				{word}
			</div>
		);
	}

	bookingSection() {
		return (
			<div>
				{!(this.state.jumpToPay)? this.renderBooking(): null}
				{(this.state.jumpToPay)? this.renderPayment() : null}
			</div>
		);
	}

	renderPayment() {
		return (
			<div>
				<div>
					<input type="radio" name="cash" value="cash" checked={this.state.payMethod === 'cash'} onChange={this.onChange.bind(this)}/>Cash
					<input type="radio" name="check" value="check" checked={this.state.payMethod === 'check'} onChange={this.onChange.bind(this)}/>Check
					<input type="radio" name="credit" value="credit" checked={this.state.payMethod === 'credit'} onChange={this.onChange.bind(this)}/>Credit
					<input type="radio" name="paypal" value="paypal" checked={this.state.payMethod === 'paypal'} onChange={this.onChange.bind(this)}/>Paypal
					<input type="radio" name="other" value="other" checked={this.state.payMethod === 'other'} onChange={this.onChange.bind(this)}/>Other
				</div>
				{this.renderPayButton()}
			</div>
		);
	}

	renderPayButton() {
		if (this.state.result[0].bookingtype_id == "1") {
			return (<button type="button" onClick={this.onClickPay.bind(this)}>Pay now</button>);
		} else {
			return (<button type="button" onClick={this.onClickPay.bind(this)}>Set payment type</button>);
		}
	}

	renderBooking() {
		if (this.state.result[0].bookingtype_id == "1") {
			return (this.instantBooking());
		} else if (this.state.result[0].bookingtype_id == "2" && this.state.result[0].active == 'yes') {
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
				<button name='user_set_fram' type="button" onClick={this.onClickUserSetFrame.bind(this)}>Set!!</button>
			</div>
		);
	}

	renderingHostSetTimeFrameBookingButton() {
		return (
			<div>
				<button name='host_set_fram' type="button" onClick={this.onClickHostSetFrame.bind(this)}>Set!!</button>
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
				Your Bid<input name='bid_amount' type="number" onChange={this.onChange.bind(this)}></input> {this.state.bid_update ? "(your bid is updated)" : ""}
				<br></br>
				{this.state.bid_amount_ok ? <button type="button" onClick={this.onClickAuctionBooking.bind(this)}>Submit</button> : null}

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
				How much do you want to pay?: <b>${this.state.cost}</b> <input name='cost' className="slide" type="range" min="0" max={parseInt(this.state.result[0].cost_per_night) + 100} defaultValue={this.state.result[0].cost_per_night} onChange={this.onChange.bind(this)}></input>
				How long will you give the host to respond?: <b> {this.state.response_time} days</b><input name='response_time' className="slide" type="range" min="0" max="14" value={this.state.response_time} onChange={this.onChange.bind(this)}></input>
				<br></br>
				Check in<input name='book_check_in' type="date" defaultValue={this.state.default_check_in_date} onChange={this.onChange.bind(this)}></input>
				Check out<input name='book_check_out' type="date" defaultValue={this.state.default_check_out_date} onChange={this.onChange.bind(this)}></input>
				<br></br>
				{(this.state.bookButtonOK)? this.renderingUserSetTimeFrameBookingButton() : "please select dates in correct range!"}
			</div>
		);
	}

	hostSetTimeFrameBooking() {
		return (
			<div>
				Response Time for host to get back to you : {this.state.result[0].response_time}
				<br/>
				How much do you want to pay? <b>${this.state.cost}</b><input name='cost' className="slide" type="range" min="0" max={parseInt(this.state.result[0].cost_per_night) + 100} defaultValue={this.state.result[0].cost_per_night} onChange={this.onChange.bind(this)}></input>
				<br/>
				Check in<input name='book_check_in' type="date" defaultValue={this.state.default_check_in_date} onChange={this.onChange.bind(this)}></input>
				Check out<input name='book_check_out' type="date" defaultValue={this.state.default_check_out_date} onChange={this.onChange.bind(this)}></input>
				<br></br>
				{(this.state.bookButtonOK)? this.renderingHostSetTimeFrameBookingButton() : "please select dates in correct range!"}
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
		} else if (type == "radio" && name == 'cash') {
			this.setState({payMethod: 'cash'});
			this.setState({payment_type_id: 1});
		} else if (type == "radio" && name == 'check') {
			this.setState({payMethod: 'check'});
			this.setState({payment_type_id: 2});
		} else if (type == "radio" && name == 'credit') {
			this.setState({payMethod: 'credit'});
			this.setState({payment_type_id: 3});
		} else if (type == "radio" && name == 'paypal') {
			this.setState({payMethod: 'paypal'});
			this.setState({payment_type_id: 4});
		} else if (type == "radio" && name == 'other') {
			this.setState({payMethod: 'other'});
			this.setState({payment_type_id: 5});
		} else if (name === "cost") {
			this.setState({cost: val});
		} else if (name === "response_time") {
			this.setState({response_time: val});
		} else if (name === "bid_amount") {
			var input = new Number(val);
			var current = new Number(this.state.result[0].current_price);
			this.setState({bid_amount: input});
			if (input <= current) {
				this.setState({bid_amount_ok: false});
			} else {
				this.setState({bid_amount_ok: true});
			}
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
			var resTime = new Date(this.state.bookResponseTime);
			var timeDiffOut	= date.getTime() - outTime.getTime();
			var timeDiffRes = date.getTime() - resTime.getTime();
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
			var resTime = new Date(this.state.bookResponseTime);
			var timeDiffIn	= date.getTime() - inTime.getTime();
			var timeDiffRes = date.getTime() - resTime.getTime();
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
		} else if (name == "book_check_response") {
			console.log("check date in book_check_response");
			var inTime = new Date(this.state.bookCheckinTime);
			var timeDiffIn	= date.getTime() - inTime.getTime();
			var outTime = new Date(this.state.bookCheckoutTime);
			var timeDiffout	= date.getTime() - outTime.getTime();
			this.setState({bookResponseTime: val});
			if (timeDiffout <= 0 && timeDiffIn >= 0) {
				this.setState({bookResponseOK: true});
			} else {
				this.setState({bookResponseOK: false});
			}
			if ((timeDiffout <= 0 && timeDiffIn >= 0) && this.state.bookCheckinRangeOK && this.state.bookCheckoutRangeOK) {
				this.setState({bookButtonOK: true});
			} else {
				this.setState({bookButtonOK: false});
			}
		}
	}

	onClickInstantBooking() {
		this.setState({jumpToPay: true});
	}

	onClickAuctionBooking() {
		this.setState({bid_update: true});
		var newResult = this.state.result;
		var g = new String(this.state.bid_amount);
		newResult[0].current_price = g;
		this.setState({result: newResult});
		this.setState({jumpToPay: true});
	}

	onClickPay() {
		if (this.state.result[0].bookingtype_id == "1") {
			this.insertReservationQuery();
			this.setState({reservedOK: false});
		} else if (this.state.result[0].bookingtype_id == "2") {
			this.insertClientAuctionBids();
			this.setState({jumpToPay: false});
		} else if (this.state.result[0].bookingtype_id == "3") {
			this.UserInsertClientRequestPlace();
			this.setState({reqOK: false});
		} else if (this.state.result[0].bookingtype_id == "4") {
			this.HostInsertClientRequestPlace();
			this.setState({reqOK: false});
		}
	}

	onClickUserSetFrame() {
		console.log("user ser frame set!!");
		this.setState({jumpToPay: true});
	}

	onClickHostSetFrame() {
		console.log("host ser frame set!!");
		this.setState({jumpToPay: true});
	}
}
