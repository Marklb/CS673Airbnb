import _ from 'lodash';
import React from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';

import TopHeader from '../top-header/top-header';
import ModalsContainer from '../modals-container/modals-container';
import LoginForm from '../login-form/login-form';
import SignUpForm from '../signup-form/signup-form';


require("./container.scss");

/*
Root container component to the app
*/
export default class Container extends React.Component {
  constructor(props) {
    super(props);


    this.state = {
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
      </div>
    );
  }

  /*

  Event Callbacks

  */



};
