import $ from 'jquery';
import React from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';

import TopHeaderBecomeAHostBtn from './top-header-become-a-host-btn';
import TopHeaderTripsBtn from './top-header-trips-btn';
import TopHeaderMessagesBtn from './top-header-messages-btn';
import TopHeaderProfileBtn from './top-header-profile-btn';

require("./top-header.scss");

// TODO: Fix login/signup modals

export default class TopHeader extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchInputText: ''
    };
  }

  renderRightButtons() {
    if(this.props.isLoggedIn === true){
      return (
        <div>
          <TopHeaderProfileBtn />
          <TopHeaderMessagesBtn />
          <TopHeaderTripsBtn />
          <TopHeaderBecomeAHostBtn className="become-a-host" />
        </div>
      );
    }else{
      return (
        <div>
          <div className="right-btn login" onClick={this.onClickLoginBtn.bind(this)}>Log In</div>
          <div className="right-btn signup" onClick={this.onClickSignUpBtn.bind(this)}>Sign Up</div>
          {/*<div className="right-btn help">Help</div>*/}
          <TopHeaderBecomeAHostBtn className="become-a-host" />
        </div>
      );
    }
  }

  render() {
    return (
      <div className="header-container">
        <div className="header-main">

          {/* TODO: Add logged in logo version */}
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
                <input type="text" placeholder="Where to?"
                  autoComplete="off"
                  name="location"
                  id="header-search-form"
                  className="location"
                  onKeyPress={this.onKeyPressSearchInput.bind(this)}
                />
              </div>
            </form>
          </div>

        </div>

      </div>
    );
  }


  // TODO: Fix these buttons
  onClickLoginBtn(event){
    this.props.showModal('login_form');
  }

  onClickSignUpBtn(event){
    this.props.showModal('signup_form');
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
