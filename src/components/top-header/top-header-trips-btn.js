import React from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';

import TopHeaderDropdownButton from './top-header-dropdown-button';

export default class TopHeaderTripsBtn extends TopHeaderDropdownButton {

  constructor(props) {
    super(props);

  }

  renderButton() {
    return (<div>Trips</div>);
  }

  renderDropdownContent() {
    return (
      <div></div>
    );
  }


};
