import React from 'react';
import { Link } from "react-router";
import $ from 'jquery';
import MyCheckBox from './mycheckbox';
require("./filter-form.scss");
export default class FilterForm extends React.Component {
	
	constructor(props) {
		super(props);

		this.state = {
			inputLocation : this.props.params.place,
			neighborhoods : null
		};
		this.getNeighborQuery(this.state.inputLocation);
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
	
	renderCheckBox(ob) {
		var numrows = ob.numrows;
		var names = ob.names;
		var rows = [];
		for (var i=0; i < numrows; i++) {
			rows.push(<MyCheckBox name={names[i]} />);
		}
		return (
			<form className="f">
				Neighborhoods
				{rows}
			</form>
		);
	}

	render() {
		return (
			<div>
				<div className="filter">
					<form className="f">
						Dates
						<input className="t1" type="date"></input>
						<input className="t" type="date"></input>
						<input className="t" type="date"></input>
					</form>
					
					<form className="f">
						Room type
						<input className="t2" type="checkbox"></input> Entire home
						<input className="t3" type="checkbox"></input> Private room
						<input className="t3" type="checkbox"></input> Shared room
					</form>
					
					<form className="f">
						Price min
						<input className="slide" type="range" min="0" max="100"></input>
						<br></br>
						Price max
						<input className="slide" type="range" min="0" max="100"></input>
					</form>

					<form className="f">
						Size
						<select className="sizeBedRoom">
							<option>Bedrooms</option>
							<option>1 bedrooms</option>
							<option>2 bedrooms</option>
							<option>3 bedrooms</option>
							<option>4 bedrooms</option>
							<option>5 bedrooms</option>
							<option>6 bedrooms</option>
							<option>7 bedrooms</option>
							<option>8 bedrooms</option>
							<option>9 bedrooms</option>
							<option>10 bedrooms</option>
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
					{this.state.neighborhoods === null ?
						this.renderCheckBox({'numrows': 1, 'names': ['hi']}) : this.renderCheckBox({'numrows': 1, 'names': [this.state.neighborhoods[0].street]})}
					
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

					<button type="button">Apply Filter</button>
					
				</div>
			</div>

		);
	}
}