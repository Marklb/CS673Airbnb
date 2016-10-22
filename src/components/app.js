import React, { Component } from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';

<<<<<<< HEAD
import Home from './home/home';
import Container from './container/container';
import Dashboard from './dashboard/dashboard';
import Inbox from './inbox/inbox';
import UsersRooms from './users-rooms/users-rooms';
import UsersTrips from './users-trips/users-trips';
import UsersEdit from './users-edit/users-edit';
import UsersNotifications from './users-notifications/users-notifications';
import FilterForm from './filter-form/filter-form';
=======
// Javascript Modules
import _ from 'lodash';

// React Components
import Container from './container';
import Dashboard from './dashboard';
import Inbox from './inbox';
import UsersRooms from './users-rooms';
import UsersTrips from './users-trips';
import UsersEdit from './users-edit';
import UsersNotifications from './users-notifications';
import FilterForm from './filter-form';
>>>>>>> 4cac84fad0128c12add8edc6c1d13bffbac031e9

require("./app.scss");

/*
I set up the App component where it just handles routing.

If you want to add something that will be included on any page then add it to the Container
component located at ./src/components/container/container.js

*/
export default class App extends React.Component {

  render() {
    // To use react-hot-reloader only instead of express replace browserHistory with hashHistory.
    // It is probably better that we stick with browserHistory, since the urls are cleaner and we
    // are being served by express incase we need any thing more advanced that requires more
    // than just react.
    return (
      <Router history={browserHistory}>
        <Route path='/' component={Container}>
          <IndexRoute component={Home} />
          <Route path='/dashboard' component={Dashboard} />
          <Route path='/inbox' component={Inbox} />
          <Route path='/rooms' component={UsersRooms} />
          <Route path='/trips/current' component={UsersTrips} />
          <Route path='/users/edit' component={UsersEdit} />
          <Route path='/users/notifications' component={UsersNotifications} />
          <Route path='/s/:place' component={FilterForm} />
          <Route path='*' component={NotFound} />
        </Route>
      </Router>
    );
  }

};


// Temporary mini placeholder components
//const Home = () => <h1>Home Page</h1>
const NotFound = () => <h1>404.. This page is not found!</h1>



// This should fix the issue with hot reloader saying that a component isn't sure how to update
if (module.hot) {
  module.hot.accept();
}
