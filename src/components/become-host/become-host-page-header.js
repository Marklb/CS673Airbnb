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

/*

*/
export default class BecomeHostMainPage extends React.Component {
  static contextTypes = {
	    userSessionHandler: React.PropTypes.instanceOf(UserSessionHandler).isRequired
  };

 	constructor(props) {
		super(props)
		

		var place_id = this.props.params.place_id;

		// Add checked: true to make a checkbox checked by default
		this.roomTypes = [
			{name: 'Entire home', id: 1},
			{name: 'Private room', id: 2},
			{name: 'Shared room', id: 3}
		];

		this.bookingTypes = [
			{name: 'Instant Book', id: 1},
			{name: 'Auction', id: 2},
			{name: 'User-Set Time Frame', id: 3},
			{name: 'Host-Set Time Frame', id: 4}
		];
		this.bookingTypesLOOKUP_NAME = {
			1: 'Instant Book',
			2: 'Auction',
			3: 'User-Set Time Frame',
			4: 'Host-Set Time Frame'
		};

		this.bookingTypesLOOKUP = {
			'Instant Book': 1,
			'Auction': 2,
			'User-Set Time Frame': 3,
			'Host-Set Time Frame': 4
		};

		this.amenities = [
			{name: 'Wireless Internet', id: 1},
			{name: 'Pool', id: 2},
			{name: 'Kitchen', id: 3},
			{name: '24-hour check-in', id: 4},
			{name: 'Air conditioning', id: 5},
			{name: 'Buzzer/wireless intercom', id: 6},
			{name: 'Cable TV', id: 7},
			{name: 'Carbon monoxide detector', id: 8},
			{name: 'Doorman', id: 9},
			{name: 'Doorman Entry', id: 10},
			{name: 'Dryer', id: 11},
			{name: 'Elevator in building', id: 12},
			{name: 'Essentials', id: 13},
			{name: 'Family/kid friendly', id: 14},
			{name: 'Fire extinguisher', id: 15},
			{name: 'First aid kit', id: 16},
			{name: 'Free parking on premises', id: 17},
			{name: 'Free parking on street', id: 18},
			{name: 'Gym', id: 19},
			{name: 'Hair dryer', id: 20},
			{name: 'Hangers', id: 21},
			{name: 'Heating', id: 22},
			{name: 'Hot tub', id: 23},
			{name: 'Indoor fireplace', id: 24},
			{name: 'Internet', id: 25},
			{name: 'Iron', id: 26},
			{name: 'Keypad', id: 27},
			{name: 'Laptop friendly workspace', id: 28},
			{name: 'Lock on bedroom door', id: 29},
			{name: 'Lockbox', id: 30},
			{name: 'Pets allowed', id: 31},
			{name: 'Safety card', id: 32},
			{name: 'Shampoo', id: 33},
			{name: 'Smartlock', id: 34},
			{name: 'Smoke detector', id: 35},
			{name: 'Smoking allowed', id: 36},
			{name: 'Suitable for events', id: 37},
			{name: 'TV', id: 38},
			{name: 'Washer', id: 39},
			{name: 'Wheelchair accessible', id: 40}
		];

		this.state = {
			// Form input control states
			fd_booking_active: false,
			fd_date_start: '',
			fd_date_end: '',
			fd_booking_type: {},
			fd_room_type_id: -1,




			// imageFiles: [],
			inputLocation : this.props.params.place_id,

			// items: [],
      imagesUploadedToBrowser: [],
			imagesOnServer: [],
      locationLatLng: null,

			showNewPaidExtraInputBox: false,
			paidExtras:
			[
				// {
				// 	name: 'Grocery Shopping',
				// 	cost: 20.00
				// }
			],
			paidExtraInput: {
				name: '',
				cost: ''
			},
			paidExtrasToAdd: [],
			paidExtrasToDel: [],

			error_message: {
				place_description: ''
			},

			formData: {
				bookingType: '',
				textInput: {
					address_street: '',
					address_city: '',
					address_state: '',
					address_zip: '',
					address_country: '',
					place_name: '',
					place_description: '',
				},
				selectOneInput: {
					bedroomsize: -1,
					numofbeds: -1,
					numofguest: -1,
					bathroomsize: -1
				},
				dateInput: {
					end_auction_time: ''
				},
				rangeInput: {
					cost: 100,
					response_time: 3
				},
				checkboxInput: {
					// booking_active: true,
				}

			}

			
		};
		// this.state.formData.checkboxInput.roomtype = {};
		// _.each(this.roomTypes, (val,key) => {
		// 	this.state.formData.checkboxInput.roomtype[val.name] = {
		// 		checked: (val.checkedDefault == true) ? true : false,
		// 		id: val.id
		// 	};
		// });

		// _.each(this.bookingTypes, (val,key) => {
		// 	this.state.fd_booking_type[val.name] = {
		// 		checked: (val.checkedDefault == true) ? true : false,
		// 		id: val.id
		// 	};
		// });

		this.state.formData.checkboxInput.amenity = {};
		_.each(this.amenities, (val,key) => {
			this.state.formData.checkboxInput.amenity[val.name] = {
				checked: (val.checkedDefault == true) ? true : false,
				id: val.id
			};
		});


		this.numofpeople = _.range(1, 11, 1); // Arr 1..10  Increment By 1
		this.bedroomsize = _.range(1, 11, 1); // Arr 1..10  Increment By 1
		this.bathroomsize = _.range(0, 8.5, 0.5); // Arr 0..8  Increment By 0.5
		this.numofbeds = _.range(1, 17, 1); // Arr 1..16  Increment By 1


		this.onChangeFormData = this.onChangeFormData.bind(this);
		this.showAddPaidExtraInput = this.showAddPaidExtraInput.bind(this);
		this.addNewPaidExtra = this.addNewPaidExtra.bind(this);
		this.onChangeNewPaidExtraInput = this.onChangeNewPaidExtraInput.bind(this);
		this.onRemovePaidExtra = this.onRemovePaidExtra.bind(this);
	}

	componentWillMount() {
		// Doesn't work right at the moment'
		// this.context.userSessionHandler.redirectIfNotAuthenticated();
	}

	componentDidMount() {
		console.log('componentDidMount');
		// this.loadTestingData();

		console.log(this.props.params.place_id);
		if(this.props.params.place_id == 0){
			console.log('Create a listing');
		}else{
			console.log('Edit a listing');
			this.loadDataEditing();
		}

  }

	componentWillReceiveProps(nextProps) {
		// You don't have to do this check first, but it can help prevent an unneeded render
		console.log(nextProps.params.place_id);
		if(nextProps.params.place_id !== this.state.inputLocation){
			this.setState({inputLocation: nextProps.params.place_id});
		}
	}

	/**
	 *
	 *
	 * @param {any} name
	 * @param {any} [opts={label:(string), labelPos:(top,right,bottom,left), }]
	 * @returns
	 *
	 * @memberOf BecomeHostMainPage
	 */
	renderTextInput(name, opts = {}) {
		return (
			<input type='text'
				className={(opts.className)? opts.className : null}
				name={name}
				value={this.state.formData.textInput[name]}
				onChange={this.onChangeFormData} />
		);
	}


	/**
	 *
	 *
	 * @param {any} name
	 * @param {any} [opts={label:(string), labelPos:(top,right,bottom,left), }]
	 * @returns
	 *
	 * @memberOf BecomeHostMainPage
	 */
	renderTextAreaInput(name, opts = {}) {
		return (
			<textarea type='text'
				className={(opts.className)? opts.className : null}
				name={name}
				value={this.state.formData.textInput[name]}
				onChange={this.onChangeFormData} />
		);
	}

	/**
	 *
	 *
	 * @param {any} name
	 * @param {any} options
	 * @param {any} [opts={className:, noneOption: }]
	 * @returns
	 *
	 * @memberOf BecomeHostMainPage
	 */
	renderSelectOneInput(name, options, opts = {}) {
		// console.log(`Setting: ${name} to: ${this.state.formData.selectOneInput[name]}`);
		return (
			<select name={name}
				value={this.state.formData.selectOneInput[name]}
				className={(opts.className)? opts.className : null}
				onChange={this.onChangeFormData}>
				{(opts.noneOption)? <option>{opts.noneOption}</option> : null}
				{options.map((val, i) => <option key={i}>{val}</option>)}
			</select>
		);
	}

	renderCheckboxInput(name, opts = {}) {
		return (
			<input type="checkbox"
				name={name}
				data-group-name={(opts.groupName)? opts.groupName : null}
				className={(opts.className)? opts.className : null}
				checked={(opts.groupName)? this.state.formData.checkboxInput[opts.groupName][name].checked : this.state.formData.checkboxInput[name]}
				onChange={this.onChangeFormData} />
		);
	}

	renderAddressInputs() {
		return (
			<div className="listing-group address-container">
				<h2>Address</h2>
				<div>
					<label>Street: {this.renderTextInput('address_street', {className: 'mokbnb-input address-input'})}</label>
					<label>City: {this.renderTextInput('address_city', {className: 'mokbnb-input address-input'})}</label>
					<label>State: {this.renderTextInput('address_state', {className: 'mokbnb-input address-input'})}</label>
					<label>Zip: {this.renderTextInput('address_zip', {className: 'mokbnb-input address-input'})}</label>
					<label>Country: {this.renderTextInput('address_country', {className: 'mokbnb-input address-input'})}</label>
				</div>
				<div>
					<GoogleMapsLocationSelector latLngCoords={this.state.locationLatLng} onCoordinatesChanged={this.onMapCoordsChange.bind(this)} />
				</div>
			</div>
		);
	}

	renderAmenitiesContainer() {
		let columnLength = 20;
		let columns = [[]];
		let col = 0;
		let i = 0;
		_.each(this.state.formData.checkboxInput.amenity, (val, key) => {
			if(((i) % (columnLength)) === 0 && i !== 0){
				columns.push([]);
				col++;
			}

			columns[col].push({
				name: key,
				checked: val.checked,
				id: val.id
			});
			i++;
		});


		return (
			<div className="listing-group listing-amenities-container">
				<h2>What amenities do you offer?</h2>
				<div className="amenities-table">
				{columns.map((val, ii) => {
					return (
						<div className="amenities-column" key={ii}>
						{val.map((val2, ii2) => {
							return (
								<label key={ii2}>
									{this.renderCheckboxInput(val2.name, {groupName: 'amenity', className: ''})}
									<span>{val2.name}</span>
								</label>
							);
						})}
						</div>
					);
				})}
				</div>
			</div>
		);
	}

	render() {
		return (
			<div>
				{/*<pre className="overlay-states">{JSON.stringify(this.state, null, 2)}</pre>*/}
				<div className="filter">
					<div className="listing-group listing-dates-calendar">
						{/*Update your calendar*/}
						<h2>Set your listings availability dates (Start, End)</h2>
						<div> 
							<input name='fd_date_start' className="mokbnb-input" 
								onChange={this.onChangeFormData} type="date" 
								value={this.state.fd_date_start}></input>
							<input name='fd_date_end' className="mokbnb-input" 
								onChange={this.onChangeFormData} type="date" 
								value={this.state.fd_date_end}></input>
						</div>
					</div>

					<div className="listing-group listing-type-container">
						<h2>What kind of place are you listing?</h2>
						<div className="roomtype-table">
							<radiogroup>
								<input type="radio" name="fd_room_type_id" data-room-id={1} onChange={this.onChangeFormData} checked={parseInt(this.state.fd_room_type_id) === 1} value="Entire home"/> Entire home<br/>
								<input type="radio" name="fd_room_type_id" data-room-id={2} onChange={this.onChangeFormData} checked={parseInt(this.state.fd_room_type_id) === 2} value="Private room"/> Private room<br/>
								<input type="radio" name="fd_room_type_id" data-room-id={3} onChange={this.onChangeFormData} checked={parseInt(this.state.fd_room_type_id) === 3} value="Shared room"/> Shared room<br/>
							</radiogroup>
							{/*{_.map(this.state.formData.checkboxInput.roomtype, (val, key) => {
								return (
										<label key={key}>
											{this.renderCheckboxInput(key, {
												groupName: 'roomtype',
												className: ''})}
											<span>{key}</span>
										</label>
								);
							})}*/}
						</div>
					</div>

					<div className="listing-group listing-limits-container">
						<h2>How many guests can your place accommodate?</h2>
						<label>
							<span>Bedroom Size:</span>
							{this.renderSelectOneInput('bedroomsize', this.bedroomsize, {
								noneOption: 'Bedrooms',
								className: 'mokbnb-input sizeBedRoom-'})}
						</label>

						<label>
							<span>Beds:</span>
							{this.renderSelectOneInput('numofbeds', this.numofbeds, {
								noneOption: 'Beds',
								className: 'mokbnb-input sizeBed-'})}
						</label>
						<br/>

						<h2>How many guests can stay?</h2>
						<label>
							<span>Number of guests:</span>
							{this.renderSelectOneInput('numofguest', this.numofpeople, {
								noneOption: 'Number of guest',
								className: 'mokbnb-input t-'})}
						</label>
						<br/>

						<h2>How many bathrooms?</h2>
						<label>
							<span>Number of bathrooms:</span>
							{this.renderSelectOneInput('bathroomsize', this.bathroomsize, {
								noneOption: 'Bathrooms',
								className: 'mokbnb-input sizeBath-'})}
						</label>
					</div>


					{this.renderAmenitiesContainer()}

					 {/*<form className='f' ref='joinForm' autoComplete='off'>*/}
					 <div className="listing-group listing-photos-container">
						  <h2>Photos</h2>
              <ListingImageUploader onImageListChange={this.onImageListChange.bind(this)}/>

							{/*<div>
                <Dropzone onDrop={this.onDrop}>
							  <div>Try dropping some files here, or click to select files to upload.</div>
							</Dropzone></div>
              {files.length > 0 ? <div>
  					<h2>Uploading {files.length} files...</h2>
  					<div>{files.map((file) => <img src={file.preview} /> )}</div>
  					</div> : null}*/}


					</div>
					{/*</form>*/}

					{this.renderAddressInputs()}

					<div className="listing-group listing-name-desc-container">
						<h2>Room Description</h2>
						<div>
							<label>Name your place: <br/>
								{this.renderTextInput('place_name', {className: 'mokbnb-input place-name-input'})}
							</label>
						</div>

						<div>
							<label>Description: <br/>
								{this.renderTextAreaInput('place_description', {className: 'mokbnb-input place-description-input'})}
							</label>
							<span>{this.state.error_message.place_description}</span>
						</div>
					</div>




					<div className="listing-group listing-booking-type-container">
						<h2>Booking Type</h2>
						<div>
							<radiogroup>
								<input type="radio" name="fd_booking_type" data-booking-id={1} onChange={this.onChangeFormData} checked={this.bookingTypesLOOKUP_NAME[this.state.fd_booking_type] === "Instant Book"} value="Instant Book"/> Instant Book<br/>
								<input type="radio" name="fd_booking_type" data-booking-id={2} onChange={this.onChangeFormData} checked={this.bookingTypesLOOKUP_NAME[this.state.fd_booking_type] === "Auction"} value="Auction"/> Auction<br/>
								<input type="radio" name="fd_booking_type" data-booking-id={3} onChange={this.onChangeFormData} checked={this.bookingTypesLOOKUP_NAME[this.state.fd_booking_type] === "User-Set Time Frame"} value="User-Set Time Frame"/> User-Set Time Frame<br/>
								<input type="radio" name="fd_booking_type" data-booking-id={4} onChange={this.onChangeFormData} checked={this.bookingTypesLOOKUP_NAME[this.state.fd_booking_type] === "Host-Set Time Frame"} value="Host-Set Time Frame"/> Host-Set Time Frame<br/>
							</radiogroup>

							<div className="listing-sub-group">
								{this.renderBookingTypeCode()}
							</div>
						</div>
					</div>

					<div className="listing-group listing-booking-type-container">
						<h2>Paid Extras</h2>
						<div id="adjust-import-data-rows">
							{this.renderPaidExtras()}
						</div>
						<button onClick={this.showAddPaidExtraInput}>Add New Paid Extra</button>
						{(this.state.showNewPaidExtraInputBox === true)?
								this.renderNewPaidExtraInput() : null}
					</div>

					<div className="listing-group listing-bottom-opts-container">
						<input type="checkbox" 
							name="fd_booking_active"
							checked={this.state.fd_booking_active}
							onChange={this.onChangeFormData} />Booking Active<br/>
					</div>
					<button name='save' type="button" onClick={this.onClickSave.bind(this)}>Save</button>

				</div>
			</div>
		);
	}

	onChangeFormData(e) {
		let newState = this.state;
		// console.log(e.target.name);
		// console.log(e.target.type);
		switch(e.target.type){
			case 'textarea':
			case 'text': {
				newState.formData.textInput[e.target.name] = e.target.value;

				if(e.target.name == 'place_description'){
					let errorMsg = '';
					if(e.target.length < 10) {
						errorMsg = "Description cannot be less than 10 words.";
					}
					newState.error_message[e.target.name] = errorMsg;
				}
			}break;
			// case 'date': {
			// 	newState.formData.dateInput[e.target.name] = e.target.value;
			// }break;
			case 'range': {
				newState.formData.rangeInput[e.target.name] = e.target.value;
			}break;
			case 'select-one': {
				newState.formData.selectOneInput[e.target.name] = e.target.value;
			}break;
			case 'checkbox': {
				let checkboxGroupName = e.target.getAttribute('data-group-name');
				if(checkboxGroupName){
					newState.formData.checkboxInput[checkboxGroupName][e.target.name].checked = e.target.checked;
				}else{
					newState.formData.checkboxInput[e.target.name] = e.target.checked;
				}
			}break;

		}
		console.log(e.target.name);
		switch(e.target.name){
			case 'fd_booking_active': newState.fd_booking_active = e.target.checked; break;
			case 'fd_date_start': newState.fd_date_start = e.target.value; break;
			case 'fd_date_end': newState.fd_date_end = e.target.value; break;
			case 'fd_booking_type': newState.fd_booking_type = e.target.getAttribute('data-booking-id'); break;
			case 'fd_room_type_id': newState.fd_room_type_id = e.target.getAttribute('data-room-id'); break;

		};
		

		this.setState(newState);
	}

	showAddPaidExtraInput(e) {
		this.setState({showNewPaidExtraInputBox: true});
	}

	renderNewPaidExtraInput() {
		return (
			<div className="new-paid-extra-input-box">
				<div>New Paid Extra:</div>

				<div className="input-wrapper">
					<label>
						<span>Name:</span>
						<input type="text" name="paid_extra_name"
							className="mokbnb-input" value={this.state.paidExtraInput.name}
							onChange={this.onChangeNewPaidExtraInput} /></label>
				</div>

				<div className="input-wrapper">
					<label>
						<span>Cost: $</span>
						<input type="text" name="paid_extra_cost"
							className="mokbnb-input" value={this.state.paidExtraInput.cost}
							onChange={this.onChangeNewPaidExtraInput} /></label>
				</div>

				<div>
					<button className="" onClick={this.addNewPaidExtra}>Add</button>
				</div>

			</div>
		);
	}

	onChangeNewPaidExtraInput(e) {
		let newState = this.state;
		switch(e.target.name){
			case 'paid_extra_name': {
				newState.paidExtraInput.name = e.target.value;
			}break;
			case 'paid_extra_cost': {
				newState.paidExtraInput.cost = e.target.value;
			}break;
		}
		this.setState(newState);
	}


	removePaidExtra(index) {
		var paidExtras = this.state.paidExtras;
		paidExtras.splice(index,1);
		this.setState({paidExtras:paidExtras});
	}

	renderPaidExtras() {
		var fields = this.state.paidExtras.map((val,i) =>{
			return (
					<tr key={i}>
						<td>{val.name}</td>
						<td>${val.cost}</td>
						<td>
							<button className=""
								data-key={i} data-name={val.name} data-cost={val.cost} data-indb={val.inDB}
								onClick={this.onRemovePaidExtra}
								>Remove</button>
						</td>
					</tr>
			);
		});

		return (
			<table>
				<thead>
					<tr>
						<th>Name</th>
						<th>Cost</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
				{fields}
				</tbody>
			</table>
		);
	}

	onRemovePaidExtra(e) {
		let newState = this.state;
		if(e.target.getAttribute('data-indb')){
			newState.paidExtrasToDel.push({
				name: e.target.getAttribute('data-name'),
				cost: e.target.getAttribute('data-cost')
			});
		}

		
		newState.paidExtras.splice(e.target.getAttribute('data-key'), 1);
		this.setState(newState);
	}

	addNewPaidExtra(e) {
		let name = this.state.paidExtraInput.name;
		let cost = this.state.paidExtraInput.cost;
		if(name.trim().length <= 0 || cost.trim().length <= 0) return;
		let newState = this.state;
		newState.paidExtras.push({name: name, cost: cost});
		newState.paidExtraInput.name = '';
		newState.paidExtraInput.cost = '';
		newState.showNewPaidExtraInputBox = false;

		newState.paidExtrasToAdd.push({name: name, cost: cost});

		this.setState(newState);
	}

	renderBookingTypeCode() {
		let bookingTypeName = this.bookingTypesLOOKUP_NAME[this.state.fd_booking_type];
		if (bookingTypeName == "Instant Book") {
			return (
				<div>
					Cost per night: <b>${this.state.formData.rangeInput.cost}</b>
					<input name='cost' className="slide" type="range"
						min="10" max="1000" value={this.state.formData.rangeInput.cost}
						onChange={this.onChangeFormData}></input>
				</div>
				)
		} else if (bookingTypeName == "Auction") {
			return (
				<div>
					Starting Bid: <b>${this.state.formData.rangeInput.cost}</b>
					<input name='cost' className="slide" type="range"
						min="10" max="1000" value={this.state.formData.rangeInput.cost}
						onChange={this.onChangeFormData}></input>
					<br/>
					Auction End Date<input name='end_auction_time' type="date"
															defaultValue={this.state.formData.dateInput.end_auction_time}
															onChange={this.onChangeFormData}></input>
				</div>
				)
		} else if (bookingTypeName == "User-Set Time Frame") {
			return (
				<div>
					Cost per night: <b>${this.state.formData.rangeInput.cost}</b>
					<input name='cost' className="slide" type="range"
						min="10" max="1000" value={this.state.formData.rangeInput.cost}
						onChange={this.onChangeFormData}></input>
				</div>
				)
		} else if (bookingTypeName == "Host-Set Time Frame") {
			return (
				<div>
					Cost per night: <b>${this.state.formData.rangeInput.cost}</b>
					<input name='cost' className="slide" type="range"
						min="10" max="1000" value={this.state.formData.rangeInput.cost}
						onChange={this.onChangeFormData}></input>
					<br/>
					How long will you need to response to user requests? : <b>
					{this.state.formData.rangeInput.response_time} days</b>
					<input name='response_time' className="slide" type="range"
						min="0" max="14" value={this.state.formData.rangeInput.response_time}
						onChange={this.onChangeFormData}></input>
				</div>
				)
		}
	}


  onImageListChange(imgList){
    this.setState({imagesUploadedToBrowser: imgList});
  }

  onMapCoordsChange(latlng){
    this.setState({locationLatLng: latlng});
  }



	onDrop(acceptedFiles, rejectedFiles) {
		console.log('Accepted files: ', acceptedFiles);
		console.log('Rejected files: ', rejectedFiles);
	}

	updatePlace() {
		// console.log('updatePlace');
		// var roomtype_id = null;
		// _.each(this.state.formData.checkboxInput.roomtype, (val,key) => {
		// 	// console.log(val);
		// 	if(val.checked == true){roomtype_id = val.id;}
		// });
		// console.log(roomtype_id);
    var amenity_ids = [];
		_.each(this.state.formData.checkboxInput.amenity, (val,key) => {
			if(val.checked == true){amenity_ids.push(val.id);}
		});

		// let thing = {
			
		// };
		// console.log(thing);

		console.log(amenity_ids);
		console.log(this.amenitiesOnEditStart);
		// let n = Math.max(amenity_ids.length, this.amenitiesOnEditStart);
		// console.log(n);
		
		let amenitiesToAdd = [];
		for(let i = 0; i < amenity_ids.length; i++){
			if(this.amenitiesOnEditStart.indexOf(amenity_ids[i]) < 0){
				amenitiesToAdd.push(amenity_ids[i]);
			}
		}
		console.log(amenitiesToAdd);


		let amenitiesToDel = [];
		for(let i = 0; i < this.amenitiesOnEditStart.length; i++){
			if(amenity_ids.indexOf(this.amenitiesOnEditStart[i]) < 0){
				amenitiesToDel.push(this.amenitiesOnEditStart[i]);
			}
		}
		console.log(amenitiesToDel);

		// let paidExtrasToAdd = [];
		// let paidExtrasToDel = [];


		// return;
		// console.log(this.state.formData.bookingType);
		// console.log(this.state.formData.dateInput.end_auction_time);
		console.log(this.state.fd_booking_active);
		$.post('/api/update_listing_data', {
			'place_id': this.props.params.place_id,
			'auth_type': this.context.userSessionHandler.getAuthType(),
      'auth_token': this.context.userSessionHandler.getAuthToken(),
      'street': this.state.formData.textInput.address_street,
      'city': this.state.formData.textInput.address_city,
      'state': this.state.formData.textInput.address_state,
      'zip': this.state.formData.textInput.address_zip,
      'country': this.state.formData.textInput.address_country,
      'locationLatLng': this.state.locationLatLng,
			'room_title': this.state.formData.textInput.place_name,
			'description': this.state.formData.textInput.place_description,
			'date_start': this.state.fd_date_start,
			'date_end': this.state.fd_date_end,
			'max_people': this.state.formData.selectOneInput.numofguest,
			'cost_per_night': this.state.formData.rangeInput.cost,
			'response_time': this.state.formData.rangeInput.response_time,
			'bedroomsize': this.state.formData.selectOneInput.bedroomsize,
			'bathroomsize': this.state.formData.selectOneInput.bathroomsize,
			'numofbeds': this.state.formData.selectOneInput.numofbeds,
      'roomtype_id': this.state.fd_room_type_id,
      'bookingtype_id': this.state.fd_booking_type,
      'amenity_ids': amenity_ids,
			'amenity_ids_to_add': this.state.amenitiesToAdd,
			'amenity_ids_to_del': this.state.amenitiesToDel,
      'is_booking_active': this.state.fd_booking_active,
      'paidExtras': this.state.paidExtras,
			'paidExtrasToAdd': this.state.paidExtrasToAdd,
			'paidExtrasToDel': this.state.paidExtrasToDel,
      'end_auction_time': this.state.formData.dateInput.end_auction_time
			
      
		}, (data, status) => {
			if(data.query_success === false) {
				console.log('Trip details query not successful');
				_gMbNotifications.addNotification('Update listing failed..', {duration: 3000, type: 'error'});
			}else{
				console.log('Trip details query successful');
				// this.setState({result: data.result});
				// console.log(data);
				_gMbNotifications.addNotification('Update listing successful.', {duration: 3000});

				// Store the pictures
				// I do one request at a time, because the file data is to big.
				// console.log(this.state.imagesUploadedToBrowser);
				// let promises = [];
				// for(let i = 0; i < this.state.imagesUploadedToBrowser.length; i++){
				// 	var p = new Promise((resolve, reject) => {
				// 		let postData = this.context.userSessionHandler.getSessionAuthValues();
				// 		postData.imgData = this.state.imagesUploadedToBrowser[i];
				// 		postData.place_id = data.place_id;  
				// 		$.post('/api/upload_place_image', postData, (data, status) => {
				// 			if(data.success === false) {
				// 				console.log('Image Upload Not Successful');
				// 				resolve('Image Upload Not Successful');
				// 			} else {
				// 				console.log('Image Upload Successful');
				// 				resolve('Image Upload Successful');
				// 			}
				// 		});
				// 	});
				// 	promises.push(p);
				// }

				// Promise.all(promises).then(values => {
				// 	console.log('Done Uploading'); 
				// 	console.log(values); 
				// });
			}


		});
	}
	
	insertNewPlace() {
		console.log('insertNewPlace');
    // var roomtype_id = null;
		// _.each(this.state.formData.checkboxInput.roomtype, (val,key) => {
		// 	if(val.checked == true){roomtype_id = val.id;}
		// });

    var amenity_ids = [];
		_.each(this.state.formData.checkboxInput.amenity, (val,key) => {
			if(val.checked == true){amenity_ids.push(val.id);}
		});

		// let thing = {

		// };
		// console.log(thing);

		// return;
		// console.log(this.state.formData.bookingType);
		// console.log(this.state.formData.dateInput.end_auction_time);
		$.post('/api/insertNewPlace', {
			'authType': this.context.userSessionHandler.getAuthType(),
      'authToken': this.context.userSessionHandler.getAuthToken(),
      'street': this.state.formData.textInput.address_street,
      'city': this.state.formData.textInput.address_city,
      'state': this.state.formData.textInput.address_state,
      'zip': this.state.formData.textInput.address_zip,
      'country': this.state.formData.textInput.address_country,
      'locationLatLng': this.state.locationLatLng,
			'room_title': this.state.formData.textInput.place_name,
			'description': this.state.formData.textInput.place_description,
			'date_start': this.state.fd_date_start,
			'date_end': this.state.fd_date_end,
			'max_people': this.state.formData.selectOneInput.numofguest,
			'cost_per_night': this.state.formData.rangeInput.cost,
			'response_time': this.state.formData.rangeInput.response_time,
			'bedroomsize': this.state.formData.selectOneInput.bedroomsize,
			'bathroomsize': this.state.formData.selectOneInput.bathroomsize,
			'numofbeds': this.state.formData.selectOneInput.numofbeds,
      'roomtype_id': this.state.fd_room_type_id,
      'bookingtype_id': this.state.fd_booking_type,
      'amenity_ids': amenity_ids,
      'is_booking_active': this.state.fd_booking_active,
      'paidExtras': this.state.paidExtras,
      'end_auction_time': this.state.formData.dateInput.end_auction_time


		}, (data, status) => {
			if(data.query_success === false) {
				console.log('Trip details query not successful');
			}else{
				console.log('Trip details query successful');
				// this.setState({result: data.result});
				console.log(data);

				// Store the pictures
				// I do one request at a time, because the file data is to big.
				console.log(this.state.imagesUploadedToBrowser);
				let promises = [];
				for(let i = 0; i < this.state.imagesUploadedToBrowser.length; i++){
					var p = new Promise((resolve, reject) => {
						let postData = this.context.userSessionHandler.getSessionAuthValues();
						postData.imgData = this.state.imagesUploadedToBrowser[i];
						postData.place_id = data.place_id;
						$.post('/api/upload_place_image', postData, (data, status) => {
							if(data.success === false) {
								console.log('Image Upload Not Successful');
								resolve('Image Upload Not Successful');
							} else {
								console.log('Image Upload Successful');
								resolve('Image Upload Successful');
							}
						});
					});
					promises.push(p);
				}

				Promise.all(promises).then(values => {
					console.log('Done Uploading');
					console.log(values);
				});
			}


		});
	}

	onClickSave() {
		if(this.props.params.place_id == 0){
			this.insertNewPlace();
		}else{
			this.updatePlace();
		}


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











	loadDataEditing() {
		console.log('loadDataEditing');
		let params = {
			'auth_type': this.context.userSessionHandler.getAuthType(),
      'auth_token': this.context.userSessionHandler.getAuthToken(),
      'place_id': this.props.params.place_id
		};
		console.log(params);
		// If this end up working it can be used if not I will just create a query fpr it
		$.post('/api/get_edit_listing_data', params, (data, status) => {
			if(data.query_success === false) {
				console.log('Load edit data query not successful');
			}else{
				console.log('Load edit data query successful');
				// this.setState({result: data.result});
				console.log(data);

				let newState = this.state;
		
				newState.fd_date_start = data.response[0][0].date_range_start.split('T')[0];
				newState.fd_date_end = data.response[0][0].date_range_end.split('T')[0];
				newState.formData.dateInput.end_auction_time = (data.response[0][0].end_auction_time)? 
					data.response[0][0].end_auction_time.split('T')[0] : undefined;

				newState.fd_room_type_id = data.response[0][0].roomtype_id;
				newState.fd_booking_active = (data.response[0][0].active == 'yes')? true : false;

				newState.formData.selectOneInput.bedroomsize = data.response[0][0].bedroomsize;
				newState.formData.selectOneInput.numofbeds = data.response[0][0].numofbeds;
				newState.formData.selectOneInput.numofguest = data.response[0][0].max_people;
				newState.formData.selectOneInput.bathroomsize = data.response[0][0].bathroomsize;

				newState.imagesOnServer = data.response[0][0].imagesOnServer;

				// console.log(data.response);
				this.amenitiesOnEditStart = [];
				for(var i = 0; i < data.response[1].length; i++){
					newState.formData.checkboxInput.amenity[data.response[1][i].amenity_name] = {checked: true, id: data.response[1][i].amenity_id}
					this.amenitiesOnEditStart.push(data.response[1][i].amenity_id);
				}

				// this.paidExtrasOnEditStart = [];
				for(var i = 0; i < data.response[2].length; i++){
					newState.paidExtras.push({name: data.response[2][i].name, cost: data.response[2][i].cost, inDB: true});
					// this.paidExtrasOnEditStart.push({name: data.response[2][i].name, cost: data.response[2][i].cost});
				}

				console.log(data.response[0][0]);
				newState.formData.textInput.address_street = data.response[0][0].street;
				newState.formData.textInput.address_city = data.response[0][0].city;
				newState.formData.textInput.address_state = data.response[0][0].state;
				newState.formData.textInput.address_zip = data.response[0][0].zip;
				newState.formData.textInput.address_country = data.response[0][0].country;
				newState.locationLatLng = {lat: data.response[0][0].latitude, lng: data.response[0][0].longitude};

				newState.formData.textInput.place_name = data.response[0][0].name;
				newState.formData.textInput.place_description = data.response[0][0].description;

				newState.fd_booking_type = data.response[0][0].bookingtype_id;

				newState.formData.rangeInput.cost = data.response[0][0].cost_per_night;
				newState.formData.rangeInput.response_time = data.response[0][0].response_time;

				newState.imagesUploadedToBrowser = data.response[0][0].pictures.split(',');

				// console.log(this.props.params.place_id);
				// if(this.props.params.place_id == 0){
				// 	console.log('Create a listing');
				// }else{
				// 	console.log('Edit a listing');
				// }


				this.setState(newState);
			}
		});



	}










	loadTestingData() {
		let newState = this.state;
		
		newState.fd_date_start = '2016-12-30'; 
		newState.fd_date_end = '2017-01-25';

		newState.fd_room_type_id =  2;

		newState.formData.selectOneInput.bedroomsize = 2;
		newState.formData.selectOneInput.numofbeds = 3;
		newState.formData.selectOneInput.numofguest = 4;
		newState.formData.selectOneInput.bathroomsize = 5;

		newState.formData.checkboxInput.amenity['Wireless Internet'] = {checked: true, id: 1};
		newState.formData.checkboxInput.amenity['Air conditioning'] = {checked: true, id: 5};

		newState.formData.textInput.address_street = '184 1st Street';
		newState.formData.textInput.address_city = 'Newark';
		newState.formData.textInput.address_state = 'NJ';
		newState.formData.textInput.address_zip = '07107';
		newState.formData.textInput.address_country = 'US';

		newState.formData.textInput.place_name = 'The Default Place';
		newState.formData.textInput.place_description = 'This is a cool place';

		newState.fd_booking_type = 1;

		console.log(this.props.params.place_id);
		if(this.props.params.place_id == 0){
			console.log('Create a listing');
		}else{
			console.log('Edit a listing');
		}


		this.setState(newState);
	}

};
