import React from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';

// Javascript Modules
import UserSessionHandler from '../../user-session-handler';

// React Components
import TopHeaderDropdownButton from './top-header-dropdown-button';

export default class TopHeaderProfileBtn extends TopHeaderDropdownButton {

  constructor(props) {
    super(props);

  }

  renderButton() {
    // return (<div>{fakeInfo.username}</div>);
    return (<Link to="/dashboard">{this.context.userSessionHandler.getFirstName()}</Link>);
  }

  renderDropdownContent() {
    return (
      <div></div>
    );
  }


};

TopHeaderProfileBtn.contextTypes = {
  userSessionHandler: React.PropTypes.instanceOf(UserSessionHandler).isRequired
};
