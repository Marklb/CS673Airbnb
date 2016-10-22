import React from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';

// Javascript Modules
import _ from 'lodash';
import UserSessionHandler from '../../user-session-handler';
import ModalsHandler from '../../modals-handler';


require("./context-wrapper.scss");

/*
Wrap the root container with this component
*/
export default class ContextWrapper extends React.Component {
  static childContextTypes = {
    googleApiClientId: React.PropTypes.string.isRequired,
    facebookApiAppId: React.PropTypes.string.isRequired,
    userSessionHandler: React.PropTypes.instanceOf(UserSessionHandler).isRequired,
    modalsHandler: React.PropTypes.instanceOf(ModalsHandler).isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      userSessionHandler: new UserSessionHandler(this),
      modalsHandler: new ModalsHandler()
    };
  }

  getChildContext() {
    return {
      googleApiClientId: '997870016673-18k8dg853j7uau7ol95juckeqoarhq23.apps.googleusercontent.com',
      facebookApiAppId: '193972817678388',
      userSessionHandler: this.state.userSessionHandler,
      modalsHandler: this.state.modalsHandler,
    }
  }



  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }

  /*

  Event Callbacks

  */



};
