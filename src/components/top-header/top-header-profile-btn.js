import React from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';

import TopHeaderDropdownButton from './top-header-dropdown-button';

// TODO: Remove fake info
let fakeInfo = {
  username: 'Mark'
};

export default class TopHeaderProfileBtn extends TopHeaderDropdownButton {

  constructor(props) {
    super(props);

  }

  renderButton() {
    // return (<div>{fakeInfo.username}</div>);
    return (<Link to="/dashboard">{fakeInfo.username}</Link>);
  }

  renderDropdownContent() {
    return (
      <div></div>
    );
  }


};
