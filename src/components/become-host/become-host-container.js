import React from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';

import BecomeHostPageHeader from './become-host-page-header';

require("./Become-Host-container.scss");

/*

*/
export default class BecomeHostContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }



  render() {
    return (
      <div className="become-host-container">
        <BecomeHostPageHeader {...this.props} />
        <div className="become-host-content">
          {this.props.children}
        </div>
      </div>
    );
  }

  /*

  Event Callbacks

  */



};
