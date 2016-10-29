import _ from 'lodash';
import React from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';

import DashboardContainer from '../../dashboard-container';

require("../users-edit.scss");

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August',
                          'September', 'October', 'November', 'December'];

const DAYS_RANGE = {
  start: 1,
  end: 31
};

const YEARS_RANGE = {
  start: 1896,
  end: 2016
};

/*

*/
export default class EditProfile extends React.Component {
  static propTypes = {

  };

  static defaultProps = {
    
  };

  constructor(props) {
    super(props);

  }

  componentDidMount() {

  }

  render() {
    return (
      <div>
        {this.props.theText}
        <div className="dashboard-panel">
          <div className="dashboard-panel-header">Required</div>
          <div className="dashboard-panel-body">
            <div className="dashboard-panel-form">

              <div className="form-row">
                <div className="row-label">First Name</div>
                <div className="row-content">
                  <input type="text"></input>
                </div>
              </div>

              <div className="form-row">
                <div className="row-label">Last Name</div>
                <div className="row-content">
                  <input type="text"></input>
                  <div className="row-content-text">
                    This is only shared once you have a confirmed booking with
                    another Airbnb user.
                  </div>
                </div>
              </div>

              <div className="form-row">
                <div className="row-label">I am</div>
                <div className="row-content">
                  <div className="row">
                    <select>
                      <option value="gender">Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="row-content-text">
                    This is only shared once you have a confirmed booking with
                    another Airbnb user.
                  </div>
                </div>
              </div>

              <div className="form-row">
                <div className="row-label">Birth Date</div>
                <div className="row-content">
                  <div className="row">
                    <select className="birth-date-select">
                      <option>Month</option>
                      {MONTHS.map((val, i) => {
                        return <option key={i} value={val}>{val}</option>})}
                    </select>

                    <select className="birth-date-select">
                      <option value>Day</option>
                      {_.range(DAYS_RANGE.start, DAYS_RANGE.end+1).map((val, i) => {
                        return <option key={i} value={val}>{val}</option>})}
                    </select>

                    <select className="birth-date-select">
                      <option value>Year</option>
                      {_.range(YEARS_RANGE.start, YEARS_RANGE.end+1).map((val, i) => {
                        return <option key={i} value={val}>{val}</option>})}
                    </select>
                  </div>
                  <div className="row-content-text">
                    The magical day you were dropped from the sky by a stork.
                    We use this data for analysis and never share it with other
                    users.
                  </div>
                </div>
              </div>

              <div className="form-row">
                <div className="row-label">Email Address</div>
                <div className="row-content">
                  <input type="text"></input>
                  <div className="row-content-text">
                    We won’t share your private email address with other Airbnb
                    users. Learn more.
                  </div>
                </div>
              </div>

              <div className="form-row">
                <div className="row-label">Phone Number</div>
                <div className="row-content">
                  <input type="tel"></input>
                  <div className="row-content-text">
                    This is only shared once you have a confirmed booking with
                    another Airbnb user. This is how we can all get in touch.
                  </div>
                </div>
              </div>

              {/*
              <div className="form-row">
                <div className="row-label">Preferred Language</div>
                <div className="row-content">
                  <div className="row-content-text">
                    We'll send you messages in this language.
                  </div>
                </div>
              </div>
              */}

              {/*
              <div className="form-row">
                <div className="row-label">Preffered Currency</div>
                <div className="row-content">
                  <div className="row-content-text">
                    We’ll show you prices in this currency.
                  </div>
                </div>
              </div>
              */}

              <div className="form-row">
                <div className="row-label">Where You Live</div>
                <div className="row-content">
                  <input type="text"></input>
                </div>
              </div>

              <div className="form-row">
                <div className="row-label">Describe Yourself</div>
                <div className="row-content">
                  <textarea cols="40" rows="5"></textarea>
                  <div className="row-content-text">
                    Airbnb is built on relationships. Help other people get to
                    know you.
                    <br/><br/>
                    Tell them about the things you like: What are 5 things you
                    can’t live without? Share your favorite travel destinations,
                    books, movies, shows, music, food.
                    <br/><br/>
                    Tell them what it’s like to have you as a guest or host:
                    What’s your style of traveling? Of Airbnb hosting?
                    <br/><br/>
                    Tell them about you: Do you have a life motto?
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        <div className="dashboard-panel">
          <div className="dashboard-panel-header">Optional</div>
          <div className="dashboard-panel-body">

            <div className="dashboard-panel-form">

              <div className="form-row">
                <div className="row-label">School</div>
                <div className="row-content">
                  <input type="text"></input>
                </div>
              </div>

              <div className="form-row">
                <div className="row-label">Work</div>
                <div className="row-content">
                  <input type="text"></input>
                </div>
              </div>

              {/*
              <div className="form-row">
                <div className="row-label">Time Zone</div>
                <div className="row-content">
                  <div className="row-content-text">Your home time zone.</div>
                </div>
              </div>
              */}

              {/*
              <div className="form-row">
                <div className="row-label">Languages</div>
                <div className="row-content">
                  <div className="row-content-text">
                    Add any languages that others can use to speak with you on
                    Airbnb
                  </div>
                </div>
              </div>
              */}

              {/*
              <div className="form-row">
                <div className="row-label">Emergency contact</div>
                <div className="row-content">
                  <div className="row-content-text">
                    Give our Customer Experience team a trusted contact we can
                    alert in an urgent situation.
                  </div>
                </div>
              </div>
              */}

              <div className="form-row">
                <div className="row-label">Shipping Address</div>
                <div className="row-content">

                </div>
              </div>

            </div>
          </div>
        </div>

        <div className="save-profile-btn">Save</div>

      </div>
    );
  }


  /*

  Event Callbacks

  */




};
