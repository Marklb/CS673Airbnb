import React from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';
import _ from 'lodash';
import $ from 'jquery';
import MyCheckBox from './mycheckbox';
import MyResult from './myresult';
import Dropzone from 'react-dropzone';
import ReactDOM from 'react-dom';
import UserSessionHandler from '../../user-session-handler';

import ListingImageUploader from '../listing-image-uploader';
import GoogleMapsLocationSelector from '../google-components/google-maps-location-selector';

require("./become-host-page-header.scss");
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');
/*

*/
export default class BecomeHostMainPage extends React.Component {
  static contextTypes = {
	    userSessionHandler: React.PropTypes.instanceOf(UserSessionHandler).isRequired
  };

 constructor(props) {
		 super(props)


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
			items: [],
      street:'',
      city:'',
      state:'',
      zip:'',
      country:'',
      description:'',
      title:'',
      descriptionError:'',
      imagesUploadedToBrowser:[],
      locationLatLng: null,
      isBookingActive: true,
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
    this.handleAdd = this.handleAdd.bind(this);
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
    this.handleStreet = this.handleStreet.bind(this);
    this.handleCity = this.handleCity.bind(this);
    this.handleZip = this.handleZip.bind(this);
    this.handleState = this.handleState.bind(this);
    this.handleCountry = this.handleCountry.bind(this);
    this.handleDescription = this.handleDescription.bind(this);
    this.handleTitle = this.handleTitle.bind(this);
    this.onChangeBookingActive = this.onChangeBookingActive.bind(this);

	}

	componentDidMount() {
	  $.get('/api/getUserInfo', {
		authType: this.context.userSessionHandler.getAuthType(),
		authToken: this.context.userSessionHandler.getAuthToken()
	}, (data, status) => {
		console.log("data:" + data);
		console.log("host_id:" + data.host_id);
		this.state.host_id = data.host_id;
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
		// let files = this.state.imageFiles;
		// console.log(files);

    var items = this.state.items.map(function(item, i) {
         return (
            <div key = {i} onClick = {this.handleRemove.bind(this, i)}>
               {item.name+' : $'+item.price}
            </div>
         );

      }.bind(this));

		return (
			<div>
				<div className="filter">

					<form className="f">
						Update your calendar
						<div>
						<input name='date_start' onChange={this.onChangeDateRange.bind(this)} className="t1" type="date"></input>
						<input name='date_end' onChange={this.onChangeDateRange.bind(this)} className="t" type="date"></input>
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
              <ListingImageUploader onImageListChange={this.onImageListChange.bind(this)}/>

							{/*<div>
                <Dropzone onDrop={this.onDrop}>
							  <div>Try dropping some files here, or click to select files to upload.</div>
							</Dropzone></div>
              {files.length > 0 ? <div>
  					<h2>Uploading {files.length} files...</h2>
  					<div>{files.map((file) => <img src={file.preview} /> )}</div>
  					</div> : null}*/}



					</form>

          <form className="f">
          <div>
            street:
						<div>
						<input type="text" name="street" value={this.state.street} onChange={this.handleStreet}></input>
						</div>
            city
            <div>
						<input type="text" name="city" value={this.state.city} onChange={this.handleCity}></input>
						</div>
            state
            <div>
						<input type="text" name="state" value={this.state.state} onChange={this.handleState}></input>
						</div>
            zip
            <div>
            <input type="text" name="zip" value={this.state.zip} onChange={this.handleZip}></input>
            </div>
            country
            <div>
            <input type="text" name="country" value={this.state.country} onChange={this.handleCountry}></input>
            </div>
          </div>
          <div>
          <GoogleMapsLocationSelector onCoordinatesChanged={this.onMapCoordsChange.bind(this)} />
          </div>
					</form>

					<form className="f">
						Description:
						<div>
						<textarea type="text" name="description" value={this.state.description} onChange={this.handleDescription}></textarea>
            <span>{this.state.descriptionError}</span>
            </div>
					</form>

					<form className="f">
						Name your place:
						<div>
						<input type="text" name="title" value={this.state.title} onChange={this.handleTitle}></input>
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
             <ReactCSSTransitionGroup transitionName = "example"
             transitionAppear = {true} transitionAppearTimeout = {500}
                transitionEnter = {false} transitionLeave = {false}>

            <div>Paid Extras</div>
             </ReactCSSTransitionGroup>
          </div>

          <button onClick = {this.handleAdd}>Add Extra Service/Product</button>

          <ReactCSSTransitionGroup transitionName = "example"
             transitionEnterTimeout = {500} transitionLeaveTimeout = {500}>
             {items}
          </ReactCSSTransitionGroup>
					</form>

          <input type="checkbox" onChange={this.onChangeBookingActive} defaultChecked />Booking Active<br/>
					<button name='Save and exit' type="button" onClick={this.onClickSave.bind(this)}>Save and Exit</button>

					{/*{this.renderResult(this.state.result)}*/}



				</div>


			</div>


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

  inputChange(e){
    var val = e.target.value;
    if (name === "street") {
      this.setState({street: val});
    } else if (name === "city") {
      this.setState({city: val});
    } else if (name === "state") {
      this.setState({street: val});
    } else if (name === "zip") {
      this.setState({street: val});
    } else if (name === "country") {
      this.setState({street: val});
    } else if (name === "description") {
      this.setState({street: val});
    } else if (name === "title") {
      this.setState({street: val});
    }
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

  onChangeDateRange(e){
    let newState = this.state;
    if(e.target.name == 'date_start'){
      newState.date_start = e.target.value;
    }else if(e.target.name == 'date_end'){
      newState.date_end = e.target.value;
    }
    this.setState(newState);
  }


  onImageListChange(imgList){
    this.setState({imagesUploadedToBrowser: imgList});
  }

  onMapCoordsChange(latlng){
    this.setState({locationLatLng: latlng});
  }

  handleStreet(e) {
      var value = e.target.value;
      this.setState({
        street: value,
      });
  }
  handleCity(e) {
      var value = e.target.value;
      this.setState({
        city: value,
      });
  }
  handleState(e) {
      var value = e.target.value;
      this.setState({
        state: value,
      });
  }
  handleZip(e) {
      var value = e.target.value;
      this.setState({
        zip: value,
      });
  }

  handleCountry(e) {
      var value = e.target.value;
      this.setState({
        country: value,
      });
  }

  handleDescription(e) {
      var value = e.target.value;
      var error = "";
      if(value.length < 10) {
        error = "Description cannot less than 10 words";
      }
      this.setState({
        description: value,
        descriptionError: error
      });
  }

  handleTitle(e) {
        var value = e.target.value;
        this.setState({
          title: value,
        });
  }

  onChangeBookingActive(e){
    this.setState({isBookingActive: e.target.checked});
  }

	onDrop(acceptedFiles, rejectedFiles) {
      console.log('Accepted files: ', acceptedFiles);
      console.log('Rejected files: ', rejectedFiles);
    }

	insertNewPlace() {

      var roomtypeLOOKUP = {
        'Entire home': 1,
        'Private room': 2,
        'Shared room': 3
      };

      var bookingtypeLOOKUP = {
        'Instant Book': 1,
        'Auction': 2,
        'User-set Time Frame': 3,
        'Host-set Time Frame': 4
      };

      var languageLOOKUP = {
        'English': 1,
        'Español': 2,
        'Français': 3,
        'Bahasa Indonesian': 4,
        'Bahasa Malaysia': 5,
        'Bengali': 6,
        'Dansk': 7,
        'Deutsch': 8,
        'Hindi': 9,
        'Italiano': 10,
        'Magyar': 11,
        'Nederlands': 12,
        'Norsk': 13,
        'Polski': 14,
        'Português': 15,
        'Punjabi': 16,
        'Sign Language': 17,
        'Suomi': 18,
        'Svenska': 19
      };

      var amenityLOOKUP = {
        'Wireless Internet': 1,
        'Pool': 2,
        'Kitchen': 3,
        '24-hour check-in': 4,
        'Air conditioning': 5,
        'Buzzer/wireless intercom': 6,
        'Cable TV': 7,
        'Carbon monoxide detector': 8,
        'Doorman': 9,
        'Doorman Entry': 10,
        'Dryer': 11,
        'Elevator in building': 12,
        'Essentials': 13,
        'Family/kid friendly': 14,
        'Fire extinguisher': 15,
        'First aid kit': 16,
        'Free parking on premises': 17,
        'Free parking on street': 18,
        'Gym': 19,
        'Hair dryer': 20,
        'Hangers': 21,
        'Heating': 22,
        'Hot tub': 23,
        'Indoor fireplace': 24,
        'Internet': 25,
        'Iron': 26,
        'Keypad': 27,
        'Laptop friendly workspace': 28,
        'Lock on bedroom door': 29,
        'Lockbox': 30,
        'Pets allowed': 31,
        'Safety card': 32,
        'Shampoo': 33,
        'Smartlock': 34,
        'Smoke detector': 35,
        'Smoking allowed': 36,
        'Suitable for events': 37,
        'TV': 38,
        'Washer': 39,
        'Wheelchair accessible': 40
      };

    var roomtype_id = null;
    this.state.checkbox.roomtype.forEach((val, i) => {
      if(val.checked === true) roomtype_id = roomtypeLOOKUP[val.name];
    });

    var hostlanguage_id = null;
    this.state.checkbox.hostlanguage.forEach((val, i) => {
      if(val.checked === true) hostlanguage_id = languageLOOKUP[val.name];
    });

    var amenity_ids = [];
    this.state.checkbox.amenity.forEach((val, i) => {
      if(val.checked === true) amenity_ids.push(amenityLOOKUP[val.name]);
    });

		$.post('/api/insertNewPlace', {

      //address
      'street': this.state.street,
      'city': this.state.city,
      'state': this.state.state,
      'zip': this.state.zip,
      'country': this.state.country,
      //roomtype
      'roomtype_id': roomtype_id,
      //place
      'authType': this.context.userSessionHandler.getAuthType(),
      'authToken': this.context.userSessionHandler.getAuthToken(),
			'room_title': this.state.title,
			'description': this.state.description,
			'cost_per_night': this.state.cost,//This is the same as ask_amount in hostplacelisting?
			'max_people': this.state.numofguest,
			'bedroomsize': this.state.bedroomsize,
			'bathroomsize': this.state.bathroomsize,
			'numofbeds': this.state.numofbeds,
      'payExtras': this.state.items,
      'locationLatLng': this.state.locationLatLng,
      //hostplacelisting
      'end_auction_time': this.state.end_auction_time,
			'date_start': this.state.date_start,
			'date_end': this.state.date_end,
      'response_time': this.state.response_time,
      'bookingtype_id': bookingtypeLOOKUP[this.state.booktypeData],
      'amenity_ids': amenity_ids,
      'hostlanguage_id': hostlanguage_id,
      'isBookingActive': this.state.isBookingActive
		}, (data, status) => {
			if(data.query_success === false) {
				console.log('Trip details query not successful');
			} else {
				console.log('Trip details query successful');
				this.setState({result: data.result});
			}
		});
	}

	onClickSave() {
		this.insertNewPlace();
		console.log(this.state.checkbox.roomtype[0].checked);
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

	onClickBookType(event) {
		console.log("HIT");
		console.log(event.target.value);
	}
  handleAdd(e) {
    e.preventDefault();
    var newItems = this.state.items.concat([{name: prompt('Create New Item'), price: prompt('Price')}]);
    this.setState({items: newItems});
  }
  handleRemove(i) {
    var newItems = this.state.items.slice();
    newItems.splice(i, 1);
    this.setState({items: newItems});
  }

};
