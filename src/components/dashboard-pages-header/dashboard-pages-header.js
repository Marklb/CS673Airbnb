import React from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';


require("./dashboard-pages-header.scss");

/*

*/
export default class DashboardPagesHeader extends React.Component {
  static propTypes = {

  };

  static defaultProps = {

  };

  constructor(props) {
    super(props);

    this.state = {

    };
  }

  componentDidMount() {

  }

  render() {
    // console.log('DashboardPagesHeader');
    // console.log(this.props);
    return (
      <div className="dashboard-pages-header">
        <div className="links-container">
          <Link to="/dashboard" className={(this.props.headerTab == 'dashboard') ? "active" : null}>
            <div>Dashboard</div>
          </Link>

          <Link to="/inbox" className={(this.props.headerTab == 'inbox') ? "active" : null}>
            <div>Inbox</div>
          </Link>

          <Link to="/rooms" className={(this.props.headerTab == 'your-listings') ? "active" : null}>
            <div>Your Listings</div>
          </Link>

          <Link to="/trips/current" className={(this.props.headerTab == 'your-trips') ? "active" : null}>
            <div>Your Trips</div>
          </Link>

          <Link to="/users/edit" className={(this.props.headerTab == 'profile') ? "active" : null}>
            <div>Profile</div>
          </Link>

          <Link to="/users/notifications" className={(this.props.headerTab == 'account') ? "active" : null}>
            <div>Account</div>
          </Link>
        </div>
      </div>
    );
  }

  /*

  Event Callbacks

  */



};
