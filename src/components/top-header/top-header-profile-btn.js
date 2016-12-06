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

    this.onClickLogoutBtn = this.onClickLogoutBtn.bind(this);
  }

  renderButton() {
    return (<Link to="/dashboard">{this.context.userSessionHandler.getFirstName()}</Link>);
  }

  renderDropdownContent() {
    return (
      <div className="drop-btns">
        <div className="drop-btn"><Link to="/dashboard">Dashboard</Link></div>
        <div className="drop-btn"><Link to="/inbox">Inbox</Link></div>
        <div className="drop-btn"><Link to="/rooms">Your Listings</Link></div>
        <div className="drop-btn"><Link to="/reservations">Your Reservations</Link></div>
        <div className="drop-btn"><Link to="/trips">Your Trips</Link></div>
        <div className="drop-btn"><Link to="/users/transaction_history">Your Transactions</Link></div>
        <div className="drop-btn"><Link to="/users/edit">Your Profile</Link></div>
        <div className="drop-btn"><Link to="/users/notifications">Account</Link></div>
        <div className="drop-btn" onClick={this.onClickLogoutBtn}>Logout</div>
      </div>
    );
  }



  onClickLogoutBtn() {
    this.context.userSessionHandler.logout();
  }


};
