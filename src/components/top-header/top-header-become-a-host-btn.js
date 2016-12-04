import React from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';

import TopHeaderDropdownButton from './top-header-dropdown-button';

export default class TopHeaderBecomeAHostBtn extends TopHeaderDropdownButton {

  constructor(props) {
    super(props);

  }

  renderButton() {
    return (<div><div className="btn-rect">Create a new Listing</div></div>);   
	}

  renderDropdownContent() {
    return (
      <div>Create a new listing to host! You could earn $324 sharing your home in Newark in a week.	</div>
    );
  }
	// render() {
    // return (
      // <div className="header-container">
        // <div className="header-main">

          // {/* TODO: Add logged in logo version */}
          // <Link to="/" className="icon-logo-container">
            // <div className="icon-logo">
              // <div></div>
            // </div>
          // </Link>
		// </div>
	// </div>
	// );
// }
};