import React from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';

import TopHeaderBecomeAHostBtn from './top-header-become-a-host-btn';
import TopHeaderTripsBtn from './top-header-trips-btn';
import TopHeaderMessagesBtn from './top-header-messages-btn';
import TopHeaderProfileBtn from './top-header-profile-btn';

import LoginForm from '../login-form/login-form';
import SignUpForm from '../signup-form/signup-form';

require("./top-header.scss");

// TODO: Fix login/signup modals

export default class TopHeader extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: false, // TODO: Remove this from being hard-coded
      loginModalVisible: false,
      signInModalVisible: false
    };
  }

  renderModalContainer() {
    // console.log(this.state);
    if(this.state.loginModalVisible){
      return (
        <div className="header-container modal-container visible"
          onClick={this.onModalContainerClicked.bind(this)}
        >
          <LoginForm />
        </div>
      );
    }

    if(this.state.signInModalVisible){
      return (
        <div className="header-container modal-container visible"
          onClick={this.onModalContainerClicked.bind(this)}
        >
          <SignUpForm />
        </div>
      );
    }

    return <div className="header-container modal-container"></div>;
  }

  renderRightButtons() {
    if(this.state.isLoggedIn === true){
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
                <input type="text" placeholder="Where to?" autoComplete="off" name="location" id="header-search-form" className="location" />
              </div>
            </form>
          </div>

        </div>
        {this.renderModalContainer()}
      </div>
    );
  }

  onModalContainerClicked(event){
    // console.log('onModalContainerClicked');
    this.state.loginModalVisible = false;
    this.state.signInModalVisible = false;
    this.setState(this.state);
  }

  onClickLoginBtn(event){
    // console.log('onClickLoginBtn');
    this.setState({loginModalVisible: true});
  }

  onClickSignUpBtn(event){
    // console.log('onClickSignUpBtn');
    this.setState({signInModalVisible: true});
  }

};
