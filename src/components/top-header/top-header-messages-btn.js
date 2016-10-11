import React from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';

import TopHeaderDropdownButton from './top-header-dropdown-button';

export default class TopHeaderMessagesBtn extends TopHeaderDropdownButton {

  constructor(props) {
    super(props);

  }

  renderButton() {
    return (<div>Messages</div>);
  }

  renderDropdownContent() {
    return (
      <div></div>
    );
  }


};
