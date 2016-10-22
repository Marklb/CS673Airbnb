import _ from 'lodash';
import React from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';

import TopHeader from '../top-header/top-header';
import ModalsContainer from '../modals-container/modals-container';
import LoginForm from '../login-form/login-form';
import SignUpForm from '../signup-form/signup-form';
import DateRangePicker from '../daterangepicker/jsx/DateRangePickerWrapper';

require("./home.scss");
require("../top-header/top-header.scss");

/*
Root home component to the app
*/
export default class Home extends React.Component {
  constructor(props) {
    super(props);

    // Probably not the best was to organized props, but works fine for now.
    this.state = {
      // TODO: Make a proper implementation for logged in status
      isLoggedIn: false,

      // Some states intended to be only used by the modal components
      modalVars: {
        isVisible: {
          // Only put booleans in this object
          login_form: false,
          signup_form: false
        },
      },
      showModal: (modal_name) => {
        let newState = this.state;
        newState.modalVars.isVisible[modal_name] = true;
        this.setState(newState);
      },
      hideModal: (modal_name) => {
        let newState = this.state;
        newState.modalVars.isVisible[modal_name] = false;
        this.setState(newState);
      },
      hideAllModals: () => {
        let newState = this.state;
        _.forEach(newState.modalVars.isVisible, function(value, key) {
            newState.modalVars.isVisible[key] = false;
          });
        this.setState(newState);
      }
    };
  }



  render() {
    return (
      <div>
        <TopHeader {...this.state} />

        {this.props.children}

        <ModalsContainer {...this.state} >
          <LoginForm name="login_form" isVisible={this.state.modalVars.isVisible.login_form} />
          <SignUpForm name="signup_form" isVisible={this.state.modalVars.isVisible.signup_form} />
        </ModalsContainer>
	<center><h1>Live There</h1></center>

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

    );
  }

  /*

  Event Callbacks

  */

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
