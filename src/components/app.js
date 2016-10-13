import _ from 'lodash';

import React, { Component } from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';

import Container from './container/container';
import UsersEdit from './users-edit/users-edit';
import FilterForm from './filter-form/filter-form';

require("./app.scss");

// TODO: Clean up this routing and remove the added snippets from examples

export default class App extends React.Component {

  render() {
    return (
      <Router history={hashHistory}>
        <Route path='/' component={Container}>
          <IndexRoute component={Home} />
          {/* TODO: Add base /users/ route component */}
          <Route path='/users/edit' component={UsersEdit} />
          <Route path='/s/:place' component={FilterForm} />
          <Route path='*' component={NotFound} />
        </Route>
      </Router>
    );
  }

};

const Home = () => <h1>Hello from Home!<Link to="/s/eriogj" className="btn-rect">Search</Link></h1>
const Address = () => <h1>We are located at 555 Jackson St.</h1>
const NotFound = () => <h1>404.. This page is not found!</h1>
