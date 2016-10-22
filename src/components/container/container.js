import _ from 'lodash';
import React from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';

// Javascript Modules
import UserSessionHandler from '../../user-session-handler';

// React Components
import ContextWrapper from '../context-wrapper';
import TopHeader from '../top-header';
import ModalsContainer from '../modals-container';
import Modal from '../modal';
import LoginForm from '../login-form';
import SignUpForm from '../signup-form';


require("./container.scss");

/*

*/
export default class Container extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }


  render() {
    return (
      <ContextWrapper>
        <TopHeader />

        {this.props.children}

        <ModalsContainer name="main_modal_container">
          <Modal name="login_form"><LoginForm /></Modal>
          <Modal name="signup_form"><SignUpForm /></Modal>
        </ModalsContainer>
      </ContextWrapper>
    );
  }

  /*

  Event Callbacks

  */



};
