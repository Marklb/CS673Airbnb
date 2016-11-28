import React from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';

// Javascript Modules
import $ from 'jquery';
import UserSessionHandler from '../../user-session-handler';
import ModalsHandler from '../../modals-handler';

// React Components
import TopHeaderBecomeAHostBtn from './top-header-become-a-host-btn';
import TopHeaderTripsBtn from './top-header-trips-btn';
import TopHeaderMessagesBtn from './top-header-messages-btn';
import TopHeaderProfileBtn from './top-header-profile-btn';
import LoginForm from '../login-form';

require("./top-header.scss");


// const USE_GOOGLE_PLACES = false;

export default class TopHeader extends React.Component {
  static contextTypes = {
    userSessionHandler: React.PropTypes.instanceOf(UserSessionHandler).isRequired,
    modalsHandler: React.PropTypes.instanceOf(ModalsHandler).isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      searchInputText: ''
    };
  }

  renderRightButtons() {
    if(this.context.userSessionHandler.isLoggedIn() === true){
      return (
        <div>
          <TopHeaderProfileBtn className="profile-btn" />
          <TopHeaderMessagesBtn />
          <TopHeaderTripsBtn />
          <TopHeaderBecomeAHostBtn className="become-a-host" />
        </div>
      );
    }else{
      return (
        <div>
          <div className="right-btn login" onClick={this.onClickLoginBtn.bind(this)}>
            <div>Log In</div>
          </div>
          <div className="right-btn signup" onClick={this.onClickSignUpBtn.bind(this)}>
            <div>Sign Up</div>
          </div>
          {/*<div className="right-btn help">Help</div>*/}
          <TopHeaderBecomeAHostBtn className="become-a-host" />
        </div>
      );
    }
  }

  renderSearchInputBox() {
    if(APP_CONSTANTS.USE_GOOGLE_PLACES_INPUT){
      // Since I am using regualr javascript dom manipulation 
      // to make the input box autocomplete with google places
      // I am using this javascript function
      let initGooglePlacesInput = () => {
        // Before getElementById can find the element it needs
        // to be added to the dom, but since react is handling
        // the dom element and when it will get added I am
        // waiting on the next animation frame to set the event,
        // so that the element will be added to the dom by then.
        window.requestAnimationFrame(() => {
          // Make the input autocomplete using google places
          let autocomplete = new google.maps.places.Autocomplete(
            document.getElementById('header-search-form'));
          // Catch the event for when a place has been selected
          autocomplete.addListener('place_changed', function() {
            var place = autocomplete.getPlace();
            // console.log(place);
            
            // Passing formatted_address since it seems closest to 
            // our implementation format
            let url = `/s/${place.formatted_address}`;
            // Adding latitude and longitude
            url += `?lat=${place.geometry.location.lat()}`;
            url += `,lng=${place.geometry.location.lng()}`;
            // console.log(`Going to ${url}`);

            // Navigate to url (Makes page refresh)
            // window.location.href = url;

            // Navigate to url (Page does not refresh)
            browserHistory.push(url);
          });
        });
      };
      return (
        <div>
          <input type="text" 
            id="header-search-form" 
            className="location" 
            name="location" 
            placeholder="Where to?"
            onKeyPress={this.onKeyPressSearchInputGooglePlaces.bind(this)}>
          </input>
          {initGooglePlacesInput()}
        </div>  
      );
    }

    return (
      <input type="text" placeholder="Where to?"
                  autoComplete="off"
                  name="location"
                  id="header-search-form"
                  className="location"
                  onKeyPress={this.onKeyPressSearchInput.bind(this)}
                />
    );
  }

  render() {
    return (
      <div className="header-container">
        <div className="header-main">

          <Link to="/" className="icon-logo-container">
            <div className="icon-logo">
              <div></div>
            </div>
          </Link>

          {this.renderRightButtons()}

          <div className="search-bar-wrapper">
            <form className="search-form">
              <div className="search-bar">
                <div className="search-bar-icon"></div>
                {this.renderSearchInputBox()}
              </div>
            </form>
          </div>

        </div>

      </div>
    );
  }


  onClickLoginBtn(event){
    this.context.modalsHandler.showModal('main_modal_container', 'login_form');
  }

  onClickSignUpBtn(event){
    this.context.modalsHandler.showModal('main_modal_container', 'signup_form');
  }

  onKeyPressSearchInputGooglePlaces(event){
    if(event.charCode === 13){
      event.preventDefault();

      // Clearing the text manually since the page isn't refreshing
      // event.target.value = '';
    }
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
      browserHistory.push(url);


      // Clearing the text manually since the page isn't refreshing
      event.target.value = '';
    }

  }

};
