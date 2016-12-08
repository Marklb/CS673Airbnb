import React from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';
import _ from 'lodash';
import $ from 'jquery';
import MyCheckBox from './mycheckbox';
import MyResult from './myresult';

import GoogleMapsSearchPlaces from '../google-components/google-maps-search-places';
import Rater from 'react-rater';

require("./filter-form.scss");

export default class FilterForm extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			inputLocation : this.props.params.place,
			latitude: this.props.location.query.lat || 0,
			longitude: this.props.location.query.lng || 0,
			neighborhoods : [],
			result : [],
			date_start : '2016-12-09',
			date_end : '2016-12-12',
			numofguest: 1,
			rating: -1,
			min_cost : 10,
			max_cost : 1000,
			bedroomsize: -1,
			bathroomsize: -1,
			numofbeds: -1,

			checkbox : {
				roomtype : [
					{name : 'Entire home', checked : false},
					{name : 'Private room', checked : false},
					{name : 'Shared room', checked : false}
				],

				bookingtype : [
					{name : 'Instant Book', checked : false},
					{name : 'Auction', checked : false},
					{name : 'User-set Time Frame', checked : false},
					{name : 'Host-set Time Frame', checked : false}
				],

				amenity : [
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
				],

				hostlanguage : [
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
				]
			}
		};

		this.numofpeople = [
			1,
			2,
			3,
			4,
			5,
			6,
			7,
			8,
			9,
			10
		];

		this.bedroomsize = [
			1,
			2,
			3,
			4,
			5,
			6,
			7,
			8,
			9,
			10
		];

		this.bathroomsize = [
			0,
			0.5,
			1,
			1.5,
			2,
			2.5,
			3,
			3.5,
			4,
			4.5,
			5,
			5.5,
			6,
			6.5,
			7,
			7.5,
			8
		];

		this.numofbeds = [
			1,
			2,
			3,
			4,
			5,
			6,
			7,
			8,
			9,
			10,
			11,
			12,
			13,
			14,
			15,
			16
		];
	}

	componentWillReceiveProps(nextProps) {
		let placeString =  nextProps.params.place;
		let urlParams = this.props.location.query;

		// You don't have to do this check first, but it can help prevent an unneeded render
		if (placeString !== this.state.inputLocation) {
			this.setState({
				inputLocation: placeString,
				latitude: urlParams.lat || 0,
				longitude: urlParams.lng || 0,
			});
			this.getPlaceQuery(placeString);
		}
	}

	getPlaceQuery(location) {
		$.post('/api/get_places', {
			'checkbox': this.state.checkbox,
			'state': location,
			'date_start': this.state.date_start,
			'date_end': this.state.date_end,
			'numofguest': this.state.numofguest,
			'min_cost': this.state.min_cost,
			'max_cost': this.state.max_cost,
			'bedroomsize': this.state.bedroomsize,
			'bathroomsize': this.state.bathroomsize,
			'numofbeds': this.state.numofbeds
  		}, (data, status) => {
  			if(data.query_success === false) {
				console.log('Show place Not Successful');
			} else {
				console.log('Show place is Successful');
				this.setState({result: data.result});
			}
		});
	}

	renderResult(result) {
		return (
			<form>
				<center><h1>-----Filter Result-----</h1></center>
				{this.renderDetails()}
			</form>
		);
	}

	render() {
		return (
			<div className="filter">
				<div>
					<div className='form'>
						<div className='text'>Date and number of guest</div>
						<br></br>
						<div className='Boxes'>Check in date <input className='box' name='date_start' defaultValue='2016-12-09' onChange={this.onChange.bind(this)} type="date"></input></div>
						<div className='Boxes'>Check out date <input className='box' name='date_end' defaultValue='2016-12-12' onChange={this.onChange.bind(this)} type="date"></input></div>
						<div className='Boxes'>No of guest <select className='box' name='numofguest' onChange={this.onChange.bind(this)}>
							<option>Choose</option>
							{this.numofpeople.map((val, i) => {
								return <option key={i}>{val}</option>;
							})}
						</select></div>
					</div>

					<div className='form'>
						<div className='text'>Room type</div>
						<br></br>
						{this.state.checkbox.roomtype.map((val, i) => {
							return <label className='checkBoxes' key={i}><input name='roomtype' value={i} type="checkbox" onChange={this.onChange.bind(this)} />{val.name}</label>;
						})}
					</div>

					<div className='form'>
						<div className='text'>Price min</div>
						<br></br>
						<input className='checkBoxes' name='min_cost' type="range" min="10" max="1000" defaultValue="10" onChange={this.onChange.bind(this)}></input> <b>${this.state.min_cost}</b>
						<br></br>
						<br></br>
						<div className='text'>Price max</div>
						<br></br>
						<input className='checkBoxes' name='max_cost' type="range" min="10" max="1000" defaultValue="1000" onChange={this.onChange.bind(this)}></input> <b>${this.state.max_cost}</b>
					</div>

					<div className='form'>
						<div className='text'>Size</div>
						<br></br>
						<div className='Boxes'>Badrooms <select className='box' name='bedroomsize' onChange={this.onChange.bind(this)}>
							<option>Choose</option>
							{this.bedroomsize.map((val, i) => {
								return <option key={i}>{val}</option>;
							})}
						</select></div>
						<div className='Boxes'>Bathrooms <select className='box' name='bathroomsize' onChange={this.onChange.bind(this)}>
							<option>Choose</option>
							{this.bathroomsize.map((val, i) => {
								return <option key={i}>{val}</option>;
							})}
						</select></div>
						<div className='Boxes'>Beds <select className='box' name='numofbeds' onChange={this.onChange.bind(this)}>
							<option>Choose</option>
							{this.numofbeds.map((val, i) => {
								return <option key={i}>{val}</option>;
							})}
						</select></div>
					</div>

					<div className='form'>
						<div className='text'>Booking type</div>
						{this.state.checkbox.bookingtype.map((val, i) => {
							return <label className='checkBoxes' key={i}><br></br><input name='bookingtype' value={i} type="checkbox" onChange={this.onChange.bind(this)} />{val.name}</label>;
						})}
					</div>

					<div className='form'>
						<div className='text'>Amenities</div>
						{this.state.checkbox.amenity.map((val, i) => {
							return <label className='checkBoxes' key={i}><br></br><input name='amenity' value={i} type="checkbox" onChange={this.onChange.bind(this)} />{val.name}</label>;
						})}
					</div>

					<div className='form'>
						<div className='text'>Host Language</div>
						{this.state.checkbox.hostlanguage.map((val, i) => {
							return <label className='checkBoxes' key={i}><br></br><input name='hostlanguage' value={i} type="checkbox" onChange={this.onChange.bind(this)} />{val.name}</label>;
						})}
					</div>

					<center><button className='button' name='apply_filter' type="button" onClick={this.onClickApplyFilter.bind(this)}>Apply Filter</button></center>

					{this.renderResult(this.state.result)}

				</div>
			</div>

		);
	}

	renderDetails() {
		return (
			<div className="filter">
				{this.state.result.map((val, i) => {
					var gMapsDataList = [];
					gMapsDataList.push({
						lat: val.latitude,
						lng: val.longitude,
						price: val.cost_per_night
					});
					return (
						<div className="form" key={i}>
							<center><div><h1>{val.name}</h1></div></center>
							<div className="fig">
								<img className="pic" src={val.pictures} onClick={this.onClickShowRoom.bind(this, i)} />
								<div className="map">
									<GoogleMapsSearchPlaces placeMarkersData={gMapsDataList} />
								</div>
							</div>
							<center><div className='dcrb'>Price  :  ${val.cost_per_night}</div></center>
							<center><div className='dcrb'>BookingType  :  {this.state.checkbox.bookingtype[val.bookingtype_id - 1].name}</div></center>
							<center><div className='dcrb'>RoomType  :  {this.state.checkbox.roomtype[val.roomtype_id - 1].name}</div></center>
							<center><div className='dcrb'>Rating  :  <Rater interactive={false} rating={val.rating}/></div></center>
							<br></br>
						</div>
					);
				})}
			</div>
		);
	}

	onClickShowRoom(indx, e){
		var place_id = this.state.result[indx].place_id;
		var lat = this.state.result[indx].latitude;
		var lng = this.state.result[indx].longitude;
		var cpn = this.state.result[indx].cost_per_night;
		console.log("place_id = " + place_id);
		let url = `/roomdetail/${place_id}_${this.state.date_start}_${this.state.date_end}_${lat}_${lng}_${cpn}_list`;
		browserHistory.push(url);
	}

	onChange(e){
		var name = e.target.name;
		var val = e.target.value;
		var type = e.target.type;
		console.log(e.target.value);

		if (type !== "checkbox") {
			if (name === "date_start") {
				this.setState({date_start: val});
			} else if (name === "date_end") {
				this.setState({date_end: val});
			} else if (name === "numofguest") {
				this.setState({numofguest: val});
			} else if (name === "bedroomsize") {
				this.setState({bedroomsize: val});
			} else if (name === "bathroomsize") {
				this.setState({bathroomsize: val});
			} else if (name === "numofbeds") {
				this.setState({numofbeds: val});
			} else if (name === "min_cost") {
				this.setState({min_cost: val});
			} else if (name === "max_cost") {
				this.setState({max_cost: val});
			}
		} else {
			var indx = e.target.value;
			var checked = e.target.checked;
			var newState = this.state;
			if (name === "roomtype") {
				newState.checkbox.roomtype[indx].checked = checked;
			} else if (name === "bookingtype") {
				newState.checkbox.bookingtype[indx].checked = checked;
			} else if (name === "amenity") {
				newState.checkbox.amenity[indx].checked = checked;
			} else if (name === "hostlanguage") {
				newState.checkbox.hostlanguage[indx].checked = checked;
			}
			this.setState(newState);
		}
	}

	onClickApplyFilter() {
		this.getPlaceQuery(this.state.inputLocation);
	}
}
