import React from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';

// Javascript modules
import _ from 'lodash';

// React Components
import {DateRangePicker} from 'react-dates';
import MapsDemo from '../google-components/maps-demo';
import ListingImageUploaderDemo from '../listing-image-uploader/listing-image-uploader-demo';


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

        <MapsDemo />

        <br/><br/>

        <ListingImageUploaderDemo />

                Welcome to mokbnb, a 12-week project where a group of 4 graduate students going for Computer Science at NJIT learn to build a Javascript, ReactJS, and MySQL website. This website is a non-functional imitation of airbnb for educational purposes. We have currently achieved the following features listed below:
                <ul>
                <li>User</li>
                        <li>Sign Up</li>
                        <li>Login</li>
                        <li>Verifications</li>
                        <li>Dashboard Landing Page</li>
                                <li>Notifications</li>
                                <li>Messages (This will be one source for all messages)</li>
                        <li>Your Trips</li>
                        <li>Account</li>
                                <li>Change details (e.g. email, password)</li>
                                <li>Delete account</li>
                                <li>Notification settings</li>
                                <li>Payment methods</li>
                                <li>Payout preferences</li>
                                <li>Transaction history (As client, and as host, in one location)</li>
                        <li>Profile</li>
                                <li>Personal information</li>
                <li>Search</li>
                        <li>Filters</li>
                                <li>Dates</li>
                                <li># Guests</li>
                                <li>Room type</li>
                                <li>Price range</li>
                                <li>Size</li>
                                <li>Book Type</li>
                                <li>Amenities</li>
                                <li>Host Language</li>
                        <li>List of rooms with basic info</li>
                                <li>Picture of room</li>
                                <li>Price</li>
                                <li>Title</li>
                                <li>Room type</li>
                                <li>Ratings</li>
                        <li>Map with markers as room locations</li>
                <li>Room description page</li>
                        <li>Photos</li>
                        <li>Detailed description</li>
                        <li>Menu to book the room as Instant Booking, Auction, User-Set Time Frame, or Host-Set Time Frame</li>
                        <li>Reviews</li>
                        <li>Location on map</li>
                <li>Host</li>
                        <li>Set Up a Listing (One large form)</li>
                               <li>Type of Booking</li>
                                       <li>Instant Booking</li>
                                       <li>Auction a listing</li>
                                       <li>User-Set Time-Frame Option</li>
                                       <li>Host-Set Time-Frame Option</li>
                                <li>Space type</li>
                                        <li>Entire place</li>
                                        <li>Private room</li>
                                        <li>Shared room</li>
                                <li>Details</li>
                                        <li>Photos</li>
                                        <li>Description</li>
                                        <li>Amenities</li>
                                        <li>Price</li>
                                        <li>Availability</li>
                                        <li>House rules</li>
                                        <li>Paid Extras Options</li>
                        <li>Manage Listings</li>
                                <li>Your Listings</li>
                                        <li>Edit Listing (Here we can adjust the listing
                settings such as type of booking, space type, details, paid extras options)</li>
                                <li>Your Reservations (List details such as plan for Check-In and Meet-In-Person options)</li>
                                <li>Transaction History (Same page as above under User)</li>
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
