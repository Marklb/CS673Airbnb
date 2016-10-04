import React from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';

import TopHeaderBecomeAHostBtn from './top-header-become-a-host-btn';
import LoginForm from '../login-form/login-form';
import SignUpForm from '../signup-form/signup-form';

require("./top-header.scss");



export default class TopHeader extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loginModalVisible: false,
      signInModalVisible: true
    };
  }

  renderModalContainer() {
    console.log(this.state);
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

  render() {
    return (
      <div className="header-container">
        <div className="header-main">

        <Link to="/" className="icon-logo-container">
          <div className="icon-logo">
            <div></div>
          </div>
        </Link>


          <div className="right-btn login" onClick={this.onClickLoginBtn.bind(this)}>Log In</div>
          <div className="right-btn signup" onClick={this.onClickSignUpBtn.bind(this)}>Sign Up</div>
          <div className="right-btn help">Help</div>
          <TopHeaderBecomeAHostBtn />

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
    console.log('onModalContainerClicked');
    this.state.loginModalVisible = false;
    this.state.signInModalVisible = false;
    this.setState(this.state);
  }

  onClickLoginBtn(event){
    console.log('onClickLoginBtn');
    this.setState({loginModalVisible: true});
  }

  onClickSignUpBtn(event){
    console.log('onClickSignUpBtn');
    this.setState({signInModalVisible: true});
  }

};
