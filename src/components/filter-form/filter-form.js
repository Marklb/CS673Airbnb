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
			isFiltersVisible: false
		};
		
		this.state = {
			inputLocation : this.props.params.place,
			neighborhoods : [],
			result : [],
			date_start : null,
			date_end : null,
			numofguest: -1,
			min_cost : -1,
			max_cost : -1,
			bedroomsize: null
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
			'1 bedrooms',
			'2 bedrooms',
			'3 bedrooms',
			'4 bedrooms',
			'5 bedrooms',
			'6 bedrooms',
			'7 bedrooms',
			'8 bedrooms',
			'9 bedrooms',
			'10 bedrooms'
		];
		
		this.rooms = [
			{img: "/images/room1.jpg", title: "room1", price: "$100", roomType: "private"},
			{img: "/images/room2.jpg", title: "room1", price: "$100", roomType: "private"},
			{img: "/images/room3.jpg", title: "room1", price: "$100", roomType: "private"}
		];
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
			'state': location,
			'date_start': this.state.date_start,
			'date_end': this.state.date_end,
			'numofguest': this.state.numofguest,
			'min_cost': this.state.min_cost,
			'max_cost': this.state.max_cost
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

	renderFilter() {
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
						<input className="t2" type="checkbox"></input> Entire home
						<input className="t3" type="checkbox"></input> Private room
						<input className="t3" type="checkbox"></input> Shared room
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
						<select name='sizeofbedroom' onChange={this.onChange.bind(this)} className="sizeBedRoom">
							<option>Bedrooms</option>
							{this.bedroomsize.map((val, i) => {
								return <option key={i}>{val}</option>;
							})}
						</select>
						<select className="sizeBath">
							<option>Bathrooms</option>
							<option>0 bathrooms</option>
							<option>0.5 bathrooms</option>
							<option>1 bathrooms</option>
							<option>1.5 bathrooms</option>
							<option>2 bathrooms</option>
							<option>2.5 bathrooms</option>
							<option>3 bathrooms</option>
							<option>3.5 bathrooms</option>
							<option>4 bathrooms</option>
							<option>4.5 bathrooms</option>
							<option>5 bathrooms</option>
							<option>5.5 bathrooms</option>
							<option>6 bathrooms</option>
							<option>6.5 bathrooms</option>
							<option>7 bathrooms</option>
							<option>7.5 bathrooms</option>
							<option>8+ bathrooms</option>
						</select>
						<select className="sizeBed">
							<option>Beds</option>
							<option>1 beds</option>
							<option>2 beds</option>
							<option>3 beds</option>
							<option>4 beds</option>
							<option>5 beds</option>
							<option>6 beds</option>
							<option>7 beds</option>
							<option>8 beds</option>
							<option>9 beds</option>
							<option>10 beds</option>
							<option>11 beds</option>
							<option>12 beds</option>
							<option>13 beds</option>
							<option>14 beds</option>
							<option>15 beds</option>
							<option>16+ beds</option>
						</select>
					</form>

					{this.renderCheckBox(this.state.neighborhoods)}

					<form className="f">
						Instant Book
						<input className="instantBook" type="checkbox"></input> on/off
					</form>

					<form className="f">
						Amenities
						<input className="t2" type="checkbox"></input> Wireless Internet
						<input className="t3" type="checkbox"></input> Pool
						<input className="t3" type="checkbox"></input> Kitchen
						<br></br>
						<input className="t4" type="checkbox"></input> 24-hour check-in
						<input className="t3" type="checkbox"></input> Air conditioning
						<input className="t3" type="checkbox"></input> Breakfast
						<br></br>
						<input className="t4" type="checkbox"></input> Buzzer/wireless intercom
						<input className="t3" type="checkbox"></input> Cable TV
						<input className="t3" type="checkbox"></input> Carbon monoxide detector
						<br></br>
						<input className="t4" type="checkbox"></input> Doorman
						<input className="t3" type="checkbox"></input> Doorman Entry
						<input className="t3" type="checkbox"></input> Dryer
						<br></br>
						<input className="t4" type="checkbox"></input> Elevator in building
						<input className="t3" type="checkbox"></input> Essentials
						<input className="t3" type="checkbox"></input> Family/kid friendly
						<br></br>
						<input className="t4" type="checkbox"></input> Fire extinguisher
						<input className="t3" type="checkbox"></input> First aid kit
						<input className="t3" type="checkbox"></input> Free parking on premises
						<br></br>
						<input className="t4" type="checkbox"></input> Free parking on street
						<input className="t3" type="checkbox"></input> Gym
						<input className="t3" type="checkbox"></input> Hair dryer
						<br></br>
						<input className="t4" type="checkbox"></input> Hangers
						<input className="t3" type="checkbox"></input> Heating
						<input className="t3" type="checkbox"></input> Hot tub
						<br></br>
						<input className="t4" type="checkbox"></input> Indoor fireplace
						<input className="t3" type="checkbox"></input> Internet
						<input className="t3" type="checkbox"></input> Iron
						<br></br>
						<input className="t4" type="checkbox"></input> Keypad
						<input className="t3" type="checkbox"></input> Laptop friendly workspace
						<input className="t3" type="checkbox"></input> Lock on bedroom door
						<br></br>
						<input className="t4" type="checkbox"></input> Lockbox
						<input className="t3" type="checkbox"></input> Pets allowed
						<input className="t3" type="checkbox"></input> Safety card
						<br></br>
						<input className="t4" type="checkbox"></input> Shampoo
						<input className="t3" type="checkbox"></input> Smartlock
						<input className="t3" type="checkbox"></input> Smoke detector
						<br></br>
						<input className="t4" type="checkbox"></input> Smoking allowed
						<input className="t3" type="checkbox"></input> Suitable for events
						<input className="t3" type="checkbox"></input> TV
						<br></br>
						<input className="t4" type="checkbox"></input> Washer
						<input className="t3" type="checkbox"></input> Wheelchair accessible
					</form>
					
					<form className="f">
						Host Language
						<input className="t2" type="checkbox"></input> English
						<input className="t3" type="checkbox"></input> Español
						<input className="t3" type="checkbox"></input> Français
						<br></br>
						<input className="t4" type="checkbox"></input> Bahasa Indonesia
						<input className="t3" type="checkbox"></input> Bahasa Malaysia
						<input className="t3" type="checkbox"></input> Bengali
						<br></br>
						<input className="t4" type="checkbox"></input> Dansk
						<input className="t3" type="checkbox"></input> Deutsch
						<input className="t3" type="checkbox"></input> Hindi
						<br></br>
						<input className="t4" type="checkbox"></input> Italiano
						<input className="t3" type="checkbox"></input> Magyar
						<input className="t3" type="checkbox"></input> Nederlands
						<br></br>
						<input className="t4" type="checkbox"></input> Norsk
						<input className="t3" type="checkbox"></input> Polski
						<input className="t3" type="checkbox"></input> Português
						<br></br>
						<input className="t4" type="checkbox"></input> Punjabi
						<input className="t3" type="checkbox"></input> Sign Language
						<input className="t3" type="checkbox"></input> Suomi
						<br></br>
						<input className="t4" type="checkbox"></input> Svenska
						<input className="t3" type="checkbox"></input> Tagalog
						<input className="t3" type="checkbox"></input> Türkçe
						<br></br>
						<input className="t4" type="checkbox"></input> Čeština
						<input className="t3" type="checkbox"></input> Ελληνικά
						<input className="t3" type="checkbox"></input> Русский
						<br></br>
						<input className="t4" type="checkbox"></input> עברית
						<input className="t3" type="checkbox"></input> العربية
						<input className="t3" type="checkbox"></input> ภาษาไทย
						<br></br>
						<input className="t4" type="checkbox"></input> 中文
						<input className="t3" type="checkbox"></input> 日本語
						<input className="t3" type="checkbox"></input> 한국어
					</form>

					<button name='apply_filter' type="button" onClick={this.onClickApplyFilter.bind(this)}>Apply Filter</button>

					{this.renderResult(this.state.result)}
					
					
					
				</div>
			</div>

		);
	}
	
	
	render() {
		return (
			<div>
				<div className="filterResult">
					
					<div>
						<div onClick={this.onClickShowFilters.bind(this)}>filters</div>
					</div>
					
					{(this.state.isFiltersVisible === true) ? this.renderFilter() : null}
					
					{this.rooms.map((val, i) => {
						return (
							<form className="f">
								<img src={val.img}  />
								<br></br>
								Title<input className="r1" type="text" placeholder={val.title}></input> 
								Price<input className="r2" type="text" placeholder={val.price}></input> 
								RoomType<input className="r3" type="text" placeholder={val.roomType}></input> 
							</form>
						);
					})}
					
					
				</div>
				<div>{this.props.params.place}</div>
			</div>

		);
	}
	
	onClickShowFilters(e){
		let newState = this.state;
		newState.isFiltersVisible = !newState.isFiltersVisible;
		this.setState(newState);
	}
	
	onChange(e){
		var name = e.target.name;
		var val = e.target.value;
		console.log(e.target.value);

		if (name === "date_start") {
			this.setState({date_start: val});
		} else if (name === "date_end") {
			this.setState({date_end: val});
		} else if (name === "numofguest") {
			this.setState({numofguest: val});
		} else if (name === "min_cost") {
			this.setState({min_cost: val});
		} else if (name === "max_cost") {
			this.setState({max_cost: val});
		}
	}

	onClickApplyFilter() {
		this.getPlaceQuery(this.state.inputLocation);
	}
	
	
}