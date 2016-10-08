import _ from 'lodash';

import React, { Component } from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';

import TopHeader from './top-header/top-header';

require("./app.scss");

// TODO: Clean up this routing and remove the added snippets from examples

export default class App extends React.Component {

  render() {
    return (
      <Router history={hashHistory}>
        <Route path='/' component={Container}>
          <IndexRoute component={Home} />
          <Route path='/address' component={Address} />
          <Route path='*' component={NotFound} />
        </Route>
      </Router>
    );
  }

};

const Home = () => <h1>Hello from Home!</h1>
const Address = () => <h1>We are located at 555 Jackson St.</h1>
const NotFound = () => <h1>404.. This page is not found!</h1>

const Nav = () => (
  <div>
    <Link to='/'>Home</Link>&nbsp;
    <Link to='/address'>Address</Link>
  </div>
)

const Container = (props) => <div>
  <TopHeader />
  {props.children}
</div>

// const Container = (props) => <div>
//   <Nav />
//   {props.children}
// </div>

// <div>
//   <h1>React Router Test App</h1>
//   <TopHeader />
// </div>
