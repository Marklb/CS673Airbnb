import React from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';
import _ from 'lodash';
import $ from 'jquery';
import MyCheckBox from './mycheckbox';
import MyResult from './myresult';
import Dropzone from 'react-dropzone';
import ReactDOM from 'react-dom';
import UserSessionHandler from '../../user-session-handler';

require("./become-host-page-header.scss");
/*

*/
export default class BecomeHostMainPage extends React.Component {
  static contextTypes = {
	    userSessionHandler: React.PropTypes.instanceOf(UserSessionHandler).isRequired  
  };
  
 constructor(props) {
		 super(props)

		 var place_id = this.props.params.place_id;
		 
		this.state = {
			isFiltersVisible: false,
			imageFiles: [],
			inputLocation : this.props.params.place,
			//neighborhoods : [],
			//result : [],
			date_start : 'N/A',
			date_end : 'N/A',
			end_auction_time : 'N/A',
			numofguest: -1,
			cost : 100,
			bedroomsize: -1,
			bathroomsize: -1,
			numofbeds: -1,
			booktypeData: '',
			response_time: 3,
			host_id: -1, 
			paidExtras:
			[
				{
					name: 'Grocery Shopping',
					cost: 20.00
				}
			],
			
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

		/*this.rooms = [
			{img: "/images/room1.jpg", title: "room1", price: "$100", roomType: "private"},
			{img: "/images/room2.jpg", title: "room1", price: "$100", roomType: "private"},
			{img: "/images/room3.jpg", title: "room1", price: "$100", roomType: "private"}
		];*/
		this.onChange = this.onChange.bind(this);
		this.addPaidExtra = this.addPaidExtra.bind(this);
		this.removePaidExtra = this.removePaidExtra.bind(this);
		this.renderPaidExtras = this.renderPaidExtras.bind(this);
	}

	componentDidMount() {
	  $.get('/api/getUserInfo', {
		authType: this.context.userSessionHandler.getAuthType(),
		authToken: this.context.userSessionHandler.getAuthToken()
	}, (data, status) => {
		console.log("data:" + data);
		console.log("host_id:" + data.user_id);
		this.state.host_id = data.user_id;
	});
  }
  
	componentWillReceiveProps(nextProps) {
	// You don't have to do this check first, but it can help prevent an unneeded render
		if (nextProps.params.place !== this.state.inputLocation) {
			this.setState({inputLocation: nextProps.params.place});
			//this.getNeighborQuery(nextProps.params.place);
			this.getPlaceQuery(nextProps.params.place);
		}
	}

	
	/*getNeighborQuery(location) {
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
	}*/

	/*getPlaceQuery(location) {
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
			'numofbeds': this.state.numofbeds
  		}, (data, status) => {
  			if(data.query_success === false) {
				console.log('Show place Not Successful');
			} else {
				console.log('Show place is Successful');
				this.setState({result: data.result});
			}
  		});
	}*/



	/*renderResult(result) {
		var rows = [];
		for (var i=0; i < result.length; i++) {
			rows.push(<MyResult name={result[i].name} />);
		}
		return (
			<form className="f">
				-----Filter Result-----
				<br></br>
				{rows.length === 0 ? 'None' : rows}
				{this.renderPicture()}
			</form>
		);
	}*/

	render() {
		let files = this.state.imageFiles;
		console.log(files);
	  
		return (
			<div>
				<div className="filter">

					<form className="f">
						Update your calendar
						<div>
						<input name='date_start' onChange={this.onChange.bind(this)} className="t1" type="date"></input>
						<input name='date_end' onChange={this.onChange.bind(this)} className="t" type="date"></input>
						</div>
					</form>

					<form className="f">
						What kind of place are you listing?
						<div>
						{this.state.checkbox.roomtype.map((val, i) => {
							return <label><br></br><input name='roomtype' value={i} className="t3" type="checkbox" onChange={this.onChange.bind(this)} />{val.name}</label>;
						})}
						</div>
					</form>

					<form className="f">
						How many guests can your place accommodate?
						<div>
						<select name='bedroomsize' onChange={this.onChange.bind(this)} className="sizeBedRoom">
							<option>Bedrooms</option>
							{this.bedroomsize.map((val, i) => {
								return <option key={i}>{val}</option>;
							})}
						</select>

						<select name='numofbeds' onChange={this.onChange.bind(this)} className="sizeBed">
							<option>Beds</option>
							{this.numofbeds.map((val, i) => {
								return <option key={i}>{val}</option>;
							})}
						</select>
						</div>
					</form>

					<form className="f">
						How many guests can stay?
						<div>
						<select name='numofguest' onChange={this.onChange.bind(this)} className="t">
							<option>Number of guest</option>
							{this.numofpeople.map((val, i) => {
								return <option key={i}>{val}</option>;
							})}
						</select>
						</div>
					</form>

					<form className="f">
						How many bathrooms?
						<div>
						<select name='bathroomsize' onChange={this.onChange.bind(this)} className="sizeBath">
							<option>Bathrooms</option>
							{this.bathroomsize.map((val, i) => {
								return <option key={i}>{val}</option>;
							})}
						</select>
						</div>

					</form>



					{/*{this.renderCheckBox(this.state.neighborhoods)}*/}



					<form className="f">
						What amenities do you offer?
						<div>
						{this.state.checkbox.amenity.map((val, i) => {
							return <label><br></br><input name='amenity' value={i} className="t3" type="checkbox" onChange={this.onChange.bind(this)} />{val.name}</label>;
						})}
						</div>
					</form>

					<form className="f">
						What Language do you use?
						<div>
						{this.state.checkbox.hostlanguage.map((val, i) => {
							return <label><br></br><input name='hostlanguage' value={i} className="t3" type="checkbox" onChange={this.onChange.bind(this)} />{val.name}</label>;
						})}
						</div>
					</form>

					 <form className='f' ref='joinForm' autoComplete='off'>
						  Photos
						  <div>
							<Dropzone onDrop={this.onDrop}>
							  <div>Try dropping some files here, or click to select files to upload.</div>
							</Dropzone>
						  </div>

						{files.length > 0 ? <div>
					<h2>Uploading {files.length} files...</h2>
					<div>{files.map((file) => <img src={file.preview} /> )}</div>
					</div> : null}
					</form>

					<form className="f">
						Discription:
						<div>
						<input type="text" name="discription"></input>
						</div>
					</form>

					<form className="f">
						Name your place:
						<div>
						<input type="text" name="title"></input>
						</div>
					</form>

					{/*<form className="f">
						Booking Type
						{this.state.checkbox.bookingtype.map((val, i) => {
							return <label><br></br><input name='bookingtype' value={i} className="t3" type="checkbox" onChange={this.onChange.bind(this)} />{val.name}</label>;
						})}
					</form>*/}

					<form className="f">
						Booking Type
						<div onChange = {this.onChange}>
							<input type="radio" name="bookType" onChange={this.onChange} value="Instant Book"/> Instant Book<br/>
							<input type="radio" name="bookType" onChange={this.onChange} value="Auction"/> Auction<br/>
							<input type="radio" name="bookType" onChange={this.onChange} value="User-Set Time Frame"/> User-Set Time Frame<br/>
							<input type="radio" name="bookType" onChange={this.onChange} value="Host-Set Time Frame"/> Host-Set Time Frame<br/>
							<p id="bookingType">{this.state.booktypeData}</p>
							{this.renderBookingTypeCode()}
						</div>
					</form>
				  <form className="f">
					  <div>
						<h2>Paid Extras</h2>
					<button onClick={this.addPaidExtra}>
						Add Paid Extra
						</button>
						<div id="adjust-import-data-rows">
							{this.renderPaidExtras}
						</div>
					</div>
					</form>
					<button name='Save and exit' type="button" onClick={this.onClickSave.bind(this)}>Save and Exit</button>
					
					{/*{this.renderResult(this.state.result)}*/}
				</div>
			</div>
		);
	}
	
	addPaidExtra() {
        return (
           <tr>
             <td>
               Paid Extra: 
             </td>
             <td>
               Name <input type="text" name="paidExtraName" />
             </td>
             <td>
               Cost <input type="text" name="paidExtraCost" />
             </td>
             <td>
               <button className="btn btn-danger" onClick={this.removePaidExtra.bind(null, this.state.paidExtras.index)} > Remove </button>
             </td>
           </tr>           
        );
    }
	
	removePaidExtra(index) {
        var paidExtras = this.state.paidExtras;
        paidExtras.splice(index,1);
        this.setState({paidExtras:paidExtras});
    }
	
	renderPaidExtras() {
       var fields = this.state.paidExtras.map((operation,index) =>{
		   return (<addPaidExtra key={index} index={index} removePaidExtra={this.removePaidExtra(this)} />);
		   });

       return (
           <table>
             <tbody>
              {fields}
             </tbody>
           </table>
       );
    }
	
		renderBookingTypeCode() {
		if (this.state.booktypeData == "Instant Book") {
			return (
				<div>
					Cost per night: <b>${this.state.cost}</b><input name='cost' className="slide" type="range" min="10" max="1000" value={this.state.cost} onChange={this.onChange.bind(this)}></input>
				</div>
				)
		} else if (this.state.booktypeData == "Auction") {
			return (
				<div>
					Starting Bid: <b>${this.state.cost}</b><input name='cost' className="slide" type="range" min="10" max="1000" value={this.state.cost} onChange={this.onChange.bind(this)}></input>
					Auction End Date<input name='end_auction_time' type="date" defaultValue={this.state.end_auction_time} onChange={this.onChange.bind(this)}></input>
				</div>
				)
		} else if (this.state.booktypeData == "User-Set Time Frame") {
			return (
				<div>
					Cost per night: <b>${this.state.cost}</b><input name='cost' className="slide" type="range" min="10" max="1000" value={this.state.cost} onChange={this.onChange.bind(this)}></input>
				</div>
				)
		} else if (this.state.booktypeData == "Host-Set Time Frame") {
			return (
				<div>
					Cost per night: <b>${this.state.cost}</b><input name='cost' className="slide" type="range" min="10" max="1000" value={this.state.cost} onChange={this.onChange.bind(this)}></input>
					How long will you need to response to user requests? : <b>{this.state.response_time} days</b><input name='response_time' className="slide" type="range" min="0" max="14" value={this.state.response_time} onChange={this.onChange.bind(this)}></input>
				</div>
				)
		}
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
			if (name === "bookType") {
				console.log("bookType");
				if (val === "Instant Book") {
					this.setState({booktypeData: e.target.value});
				} else if (val === "Auction") {
					this.setState({booktypeData: e.target.value});
				} else if (val === "User-Set Time Frame") {
					this.setState({booktypeData: e.target.value});
				} else if (val === "Host-Set Time Frame") {
					this.setState({booktypeData: e.target.value});
				}
			}
			if (name === "numofguest") {
				this.setState({numofguest: val});
			} else if (name === "bedroomsize") {
				this.setState({bedroomsize: val});
			} else if (name === "bathroomsize") {
				this.setState({bathroomsize: val});
			} else if (name === "numofbeds") {
				this.setState({numofbeds: val});
			} else if (name === "cost") {
				this.setState({cost: val});
			} else if (name === "response_time") {
				this.setState({response_time: val});
			} else if (name === "end_auction_time") {
				this.setState({end_auction_time: val});
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
	onDrop(acceptedFiles, rejectedFiles) {
      console.log('Accepted files: ', acceptedFiles);
      console.log('Rejected files: ', rejectedFiles);
    }

	/*insertNewPlace() {
		$.post('/api/insertNewPlace', {
			'bedroomsize': this.state.bedroomsize,
			'bathroomsize': this.state.bathroomsize,
			'numofbeds': this.state.numofbeds
			'host_id' : this.state.host_id,
			'room_name': this.state.room_name, 
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
	}*/
	
	onClickSave() {
		this.insertNewPlace();
		console.log(this.state.checkbox.roomtype[0].checked);
		console.log(this.state.checkbox.bookingtype[0].checked);
		console.log(this.state.checkbox.amenity[0].checked);
		console.log(this.state.checkbox.hostlanguage[0].checked);
		console.log(this.state.numofguest);
		console.log(this.state.min_cost);
		console.log(this.state.max_cost);
		console.log(this.state.bedroomsize);
		console.log(this.state.bathroomsize);
		console.log(this.state.numofbeds);
		console.log(this.state.checkbox.bookingtype);
	}

};
