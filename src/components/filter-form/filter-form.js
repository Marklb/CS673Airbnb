import React from 'react';
import { Link } from "react-router";

import _ from 'lodash';
import $ from 'jquery';
import MyCheckBox from './mycheckbox';
import MyResult from './myresult';
require("./filter-form.scss");
export default class FilterForm extends React.Component {
	
	constructor(props) {
		super(props);

		this.state = {
			inputLocation : this.props.params.place,
			neighborhoods : [],
			result : [],
			date_start : null,
			date_end : null,
			numofguest: -1,
			min_cost : -1,
			max_cost : -1,
			bedroomsize: -1,
			bathroomsize: -1,
			bedsize: -1,

			checkbox : {
				roomtype : [
					{name : 'Entire home', checked : false},
					{name : 'Private room', checked : false},
					{name : 'Shared room', checked : false}
				],

				instantbook : [
					{name : 'on/off', checked : false}
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
					{name : 'Svenska', checked : false},
					{name : 'Tagalog', checked : false},
					{name : 'Türkçe', checked : false},
					{name : 'Čeština', checked : false},
					{name : 'Ελληνικά', checked : false},
					{name : 'Русский', checked : false},
					{name : 'العربية', checked : false},
					{name : 'עברית', checked : false},
					{name : 'ภาษาไทย', checked : false},
					{name : '中文', checked : false},
					{name : '日本語', checked : false},
					{name : '한국어', checked : false}
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

		this.bedsize = [
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
		]
	}

	componentWillReceiveProps(nextProps) {
	// You don't have to do this check first, but it can help prevent an unneeded render
		if (nextProps.params.place !== this.state.inputLocation) {
			this.setState({inputLocation: nextProps.params.place});
			this.getNeighborQuery(nextProps.params.place);
			this.getPlaceQuery(nextProps.params.place);
		}
	}

	getNeighborQuery(location) {
		$.post('/api/showneighbor', {
  			'city': location
  		}, (data, status) => {
  			if(data.query_success === false) {
				console.log('Show neighbor Not Successful');
			} else {
				console.log('Show neighbor is Successful');
				this.setState({neighborhoods: data.neighborhoods});
			}
  		});
	}

	getPlaceQuery(location) {
		$.post('/api/showplace', {
			'checkbox': this.state.checkbox,
			'state': location,
			'date_start': this.state.date_start,
			'date_end': this.state.date_end,
			'numofguest': this.state.numofguest,
			'min_cost': this.state.min_cost,
			'max_cost': this.state.max_cost,
			'bedroomsize': this.state.bedroomsize,
			'bathroomsize': this.state.bathroomsize,
			'bedsize': this.state.bedsize
  		}, (data, status) => {
  			if(data.query_success === false) {
				console.log('Show place Not Successful');
			} else {
				console.log('Show place is Successful');
				this.setState({result: data.result});
			}
  		});
	}

	renderCheckBox(neighbor) {
		var rows = [];
		for (var i=0; i < neighbor.length; i++) {
			rows.push(<MyCheckBox street={neighbor[i].street} />);
		}
		return (
			<form className="f">
				Neighborhoods
				<br></br>
				{rows.length === 0 ? 'None' : rows}
			</form>
		);
	}

	renderResult(result) {
		var rows = [];
		for (var i=0; i < result.length; i++) {
			rows.push(<MyResult name={result[i].name} />);
		}
		return (
			<form className="f">
				-----Filter Result-----
				<br></br>
				{rows.length === 0 ? 'None' : rows}
			</form>
		);
	}

	render() {
		return (
			<div>
				<div className="filter">
					<form className="f">
						Dates
						<input name='date_start' onChange={this.onChange.bind(this)} className="t1" type="date"></input>
						<input name='date_end' onChange={this.onChange.bind(this)} className="t" type="date"></input>
						<select name='numofguest' onChange={this.onChange.bind(this)} className="t">
							<option>Number of guest</option>
							{this.numofpeople.map((val, i) => {
								return <option key={i}>{val}</option>;
							})}
						</select>
					</form>

					<form className="f">
						Room type
						{this.state.checkbox.roomtype.map((val, i) => {
							return <label><br></br><input name='roomtype' value={i} className="t3" type="checkbox" onChange={this.onChange.bind(this)} />{val.name}</label>;
						})}
					</form>

					<form className="f">
						Price min
						<input name='min_cost' className="slide" type="range" min="10" max="1000" onChange={this.onChange.bind(this)}></input>
						<br></br>
						Price max
						<input name='max_cost' className="slide" type="range" min="10" max="1000" onChange={this.onChange.bind(this)}></input>
					</form>

					<form className="f">
						Size
						<select name='bedroomsize' onChange={this.onChange.bind(this)} className="sizeBedRoom">
							<option>Bedrooms</option>
							{this.bedroomsize.map((val, i) => {
								return <option key={i}>{val}</option>;
							})}
						</select>
						<select name='bathroomsize' onChange={this.onChange.bind(this)} className="sizeBath">
							<option>Bathrooms</option>
							{this.bathroomsize.map((val, i) => {
								return <option key={i}>{val}</option>;
							})}
						</select>
						<select name='bedsize' onChange={this.onChange.bind(this)} className="sizeBed">
							<option>Beds</option>
							{this.bedsize.map((val, i) => {
								return <option key={i}>{val}</option>;
							})}
						</select>
					</form>

					{this.renderCheckBox(this.state.neighborhoods)}

					<form className="f">
						Instant Book
						{this.state.checkbox.instantbook.map((val, i) => {
							return <label><br></br><input name='instantbook' value={i} className="t3" type="checkbox" onChange={this.onChange.bind(this)} />{val.name}</label>;
						})}
					</form>

					<form className="f">
						Amenities
						{this.state.checkbox.amenity.map((val, i) => {
							return <label><br></br><input name='amenity' value={i} className="t3" type="checkbox" onChange={this.onChange.bind(this)} />{val.name}</label>;
						})}
					</form>
					
					<form className="f">
						Host Language
						{this.state.checkbox.hostlanguage.map((val, i) => {
							return <label><br></br><input name='hostlanguage' value={i} className="t3" type="checkbox" onChange={this.onChange.bind(this)} />{val.name}</label>;
						})}
					</form>

					<button name='apply_filter' type="button" onClick={this.onClickApplyFilter.bind(this)}>Apply Filter</button>

					{this.renderResult(this.state.result)}

				</div>
			</div>

		);
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
			} else if (name === "bedsize") {
				this.setState({bedsize: val});
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
			} else if (name === "instantbook") {
				newState.checkbox.instantbook[indx].checked = checked;
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
		console.log(this.state.checkbox.roomtype[0].checked);
		console.log(this.state.checkbox.instantbook[0].checked);
		console.log(this.state.checkbox.amenity[0].checked);
		console.log(this.state.checkbox.hostlanguage[0].checked);
		console.log(this.state.date_start);
		console.log(this.state.date_end);
		console.log(this.state.numofguest);
		console.log(this.state.min_cost);
		console.log(this.state.max_cost);
		console.log(this.state.bedroomsize);
		console.log(this.state.bathroomsize);
		console.log(this.state.bedsize);
	}
}