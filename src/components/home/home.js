import React from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';

// Javascript modules
import _ from 'lodash';

// React Components
import {DateRangePicker} from 'react-dates';
import MapsDemo from '../google-components/maps-demo';
import ListingImageUploaderDemo from '../listing-image-uploader/listing-image-uploader-demo';


let MbNotifications = require('../../mblibs/mb-notifications');
// console.log(MbNotifications);
window._gMbNotifications = document.createElement('mb-notifications');
document.body.appendChild(window._gMbNotifications);

require("./home.scss");
require("../top-header/top-header.scss");

/*
Home page component
*/
export default class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      focusedInput: null,
      startDate: null,
      endDate: null
    };
  }


  render() {

    return (
		<div>
			<center><h1>Live There</h1></center>

			{/*<MapsDemo />

			<br/><br/>

			<ListingImageUploaderDemo />*/}

			<p className='p'>
				Welcome to mokbnb, a 12-week project where a group of 4 graduate students going for Computer Science at NJIT learn to build a Javascript, ReactJS, and MySQL website. This website is a non-functional imitation of airbnb for educational purposes. We have currently achieved the following features listed below:
			</p>

			<ul className='bullet'>
				<li>User</li>
				<ul className='bullet_sub_1'>
					<li>Sign Up</li>
					<li>Login</li>
					<li>Verifications</li>
					<li>Dashboard Landing Page</li>
						<ul className='bullet_sub_2'>
							<li>Notifications</li>
							<li>Messages (This will be one source for all messages)</li>
						</ul>
					<li>Your Trips</li>
					<li>Account</li>
						<ul className='bullet_sub_2'>
							<li>Change details (e.g. email, password)</li>
							<li>Delete account</li>
							<li>Notification settings</li>
							<li>Payment methods</li>
							<li>Payout preferences</li>
							<li>Transaction history (As client, and as host, in one location)</li>
						</ul>
					<li>Profile</li>
						<ul className='bullet_sub_2'>
							<li>Personal information</li>
						</ul>
				</ul>
				<li>Search</li>
				<ul className='bullet_sub_1'>
					<li>Filters</li>
						<ul className='bullet_sub_2'>
							<li>Dates</li>
							<li># Guests</li>
							<li>Room type</li>
							<li>Price range</li>
							<li>Size</li>
							<li>Book Type</li>
							<li>Amenities</li>
							<li>Host Language</li>
						</ul>
					<li>List of rooms with basic info</li>
						<ul className='bullet_sub_2'>
							<li>Picture of room</li>
							<li>Price</li>
							<li>Title</li>
							<li>Room type</li>
							<li>Ratings</li>
						</ul>
					<li>Map with markers as room locations</li>
				</ul>
				<li>Room description page</li>
				<ul className='bullet_sub_1'>
					<li>Photos</li>
					<li>Detailed description</li>
					<li>Menu to book the room as Instant Booking, Auction, User-Set Time Frame, or Host-Set Time Frame</li>
					<li>Reviews</li>
					<li>Location on map</li>
				</ul>
				<li>Host</li>
				<ul className='bullet_sub_1'>
					<li>Set Up a Listing (One large form)</li>
					<ul className='bullet_sub_2'>
						<li>Type of Booking</li>
						<ul className='bullet_sub_3'>
							<li>Instant Booking</li>
							<li>Auction a listing</li>
							<li>User-Set Time-Frame Option</li>
							<li>Host-Set Time-Frame Option</li>
						</ul>
					</ul>
					<ul className='bullet_sub_2'>
						<li>Space type</li>
						<ul className='bullet_sub_3'>
							<li>Entire place</li>
							<li>Private room</li>
							<li>Shared room</li>
						</ul>
					</ul>
					<ul className='bullet_sub_2'>
						<li>Details</li>
						<ul className='bullet_sub_3'>
							<li>Photos</li>
							<li>Description</li>
							<li>Amenities</li>
							<li>Price</li>
							<li>Availability</li>
							<li>House rules</li>
							<li>Paid Extras Options</li>
						</ul>
					</ul>
					<li>Manage Listings</li>
					<ul className='bullet_sub_2'>
						<li>Your Listings</li>
							<ul className='bullet_sub_3'>
								<li>Edit Listing (Here we can adjust the listing settings such as type of booking, space type, details, paid extras options)</li>
							</ul>
						<li>Your Reservations (List details such as plan for Check-In and Meet-In-Person options)</li>
						<li>Transaction History (Same page as above under User)</li>
					</ul>
				</ul>
			</ul>
		</div>
    );
  }

  /*

  Event Callbacks

  */
  onDatesChange({ startDate, endDate }) {
    this.setState({ startDate, endDate });
  }

  onFocusChange(focusedInput) {
    this.setState({ focusedInput });
  }

  onKeyPressSearchInput(event){
    console.log('Clicked Enter');
    console.log(event.target.value);
    // console.log(event.charCode);
    if(event.charCode === 13){
      event.preventDefault();

      // $.get(`/s/${event.target.value}`);
      // console.log(this.state.searchInputText);

      let url = `/s/${event.target.value}`;
      // console.log(`Going to ${url}`);

      // Navigate to url (Makes page refresh)
      // window.location.href = url;

      // Navigate to url (Page does not refresh)
      history.pushState(null, null, url);

      // Clearing the text manually since the page isn't refreshing
      event.target.value = '';
    }

  }



};
