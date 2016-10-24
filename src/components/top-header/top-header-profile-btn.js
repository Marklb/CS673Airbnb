import React from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';

// Javascript Modules
import UserSessionHandler from '../../user-session-handler';

// React Components
import TopHeaderDropdownButton from './top-header-dropdown-button';

export default class TopHeaderProfileBtn extends TopHeaderDropdownButton {
  static contextTypes = {
    userSessionHandler: React.PropTypes.instanceOf(UserSessionHandler).isRequired
  };

  constructor(props) {
    super(props);

  }

  renderButton() {
    // return (<div>{fakeInfo.username}</div>);
    return (<Link to="/dashboard">{this.context.userSessionHandler.getFirstName()}</Link>);
  }

  renderDropdownContent() {
    return (
      <div className="drop-btns">
        <div className="drop-btn">Edit Profile</div>
        <div className="drop-btn">Travel Credit</div>
        <div className="drop-btn">Gift Cards</div>
        <div className="drop-btn">Account Settings</div>
        <div className="drop-btn">Business Travel</div>
        <div className="drop-btn">My Guidebook</div>
        <div className="drop-btn">Logout</div>
      </div>
    );
  }


};
