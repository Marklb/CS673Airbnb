import React from 'react';
import { Link } from "react-router";
import _ from 'lodash';
import $ from 'jquery';
//import MyCheckBox from './mycheckbox';
//import MyResult from './myresult';
require("./room-display.scss");
export default class RoomDisplay extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			hostID : this.props.params.hostID,
			placeID : this.props.params.placeID
		}
	}

	getPlaceQuery(location) {
		$.post('/api/showplace', {
			//Below is information passed from filter-form
			'hostID': hostID,
			'placeID': placeID,
			'roomtype': this.state.roomtype,
			'bookingtype': this.state.bookingtype,
			'date_user_start': this.state.date_user_start,
			'date_user_end': this.state.date_user_end,
			'cost_per_night': this.state.cost_per_night,
			'title': this.state.title //name
			'pictures': this.state.pictures
			//Below is information to be populated by SQL query
			'addr_id': this.state.addr_id,
			'street': this.state.street,
			'city': this.state.city,
			'state': this.state.state,
			'zip': this.state.zip,
			'country': this.state.country,
			'description': this.state.description,
			'max_people': this.state.max_people,
			'bedroomsize': this.state.bedroomsize,
			'bathroomsize': this.state.bathroomsize,
			'numofbeds': this.state.numofbeds,
			'date_host_start': this.state.date_host_start,
			'date_host_end': this.state.date_host_end,
			'booked_dates': this.state.booked_dates,
			'host_ask_amount': this.state.host_ask_amount,
			'user_ask_amount': this.state.user_ask_amount,
			'host_response_time': this.state.host_response_time,
			'user_response_time': this.state.user_response_time,
			
			//How to bring in amenity? Do at very end
			//How to bring in languages? Do at very end

  		}, (data, status) => {
  			if(data.query_success === false) {
				console.log('Show place Not Successful');
			} else {
				console.log('Show place is Successful');
				this.setState({result: data.result});
			}
  		});
	}

	render() {
		return (
			<form></form>
		);
	}

	renderPicture() {
		return (
			<div>
				<div className="filterResult">
					<div>
						<div onClick={this.onClickShowFilters.bind(this)}>filters</div>
					</div>

					{(this.state.isFiltersVisible === true) ? this.renderFilter() : null}

					{this.state.result.map((val, i) => {
						return (
							<form className="f">
								<img src={val.pictures}  />
								<br></br>
								Title<input className="r1" type="text" placeholder={val.name}></input>
								Price<input className="r2" type="text" placeholder={val.cost_per_night}></input>
								BookingType<input className="r3" type="text" placeholder={this.state.checkbox.bookingtype[val.bookingtype_id - 1].name}></input>
								RoomType<input className="r3" type="text" placeholder={this.state.checkbox.roomtype[val.roomtype_id - 1].name}></input>
							</form>
						);
					})}
				</div>
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
		console.log(this.state.checkbox.roomtype[0].checked);
		console.log(this.state.checkbox.bookingtype[0].checked);
		console.log(this.state.checkbox.amenity[0].checked);
		console.log(this.state.checkbox.hostlanguage[0].checked);
		console.log(this.state.date_start);
		console.log(this.state.date_end);
		console.log(this.state.numofguest);
		console.log(this.state.min_cost);
		console.log(this.state.max_cost);
		console.log(this.state.bedroomsize);
		console.log(this.state.bathroomsize);
		console.log(this.state.numofbeds);
		console.log(this.state.checkbox.bookingtype);
	}
}
