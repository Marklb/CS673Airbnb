import React from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';

// Javascript Modules
import _ from 'lodash';
import $ from 'jquery';
import UserSessionHandler from '../../../user-session-handler';
import ModalsHandler from '../../../modals-handler';

// React Components
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
  static contextTypes = {
    userSessionHandler: React.PropTypes.instanceOf(UserSessionHandler).isRequired,
    modalsHandler: React.PropTypes.instanceOf(ModalsHandler).isRequired
  };

  static propTypes = {

  };

  static defaultProps = {

  };

  constructor(props) {
    super(props);

    this.state = {
      formValues: {
        firstName: '',
        lastName: ''
      }
    };

    this.onChangeFirstName = this.onChangeFirstName.bind(this);
    this.onChangeLastName = this.onChangeLastName.bind(this);

    this.onClickSaveBtn = this.onClickSaveBtn.bind(this);
  }

  componentDidMount() {
    $.get('/api/getUserInfo', {
        authType: this.context.userSessionHandler.getAuthType(),
        authToken: this.context.userSessionHandler.getAuthToken()
    	}, (data, status) => {
        console.log(data);
        let newState = this.state;
        if(data.first_name) newState.formValues.firstName = data.first_name;
        if(data.last_name) newState.formValues.lastName = data.last_name;
        this.setState(newState);

        // this._firstName = data.first_name;
        // this._isLoggedIn = true;
        //
        // let newState = this._reactComponent.state;
        // newState.userSessionHandler = this;
        // this._reactComponent.setState(newState);
    	});
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
                  <input type="text"
                    value={this.state.formValues.firstName}
                    onChange={this.onChangeFirstName}></input>
                </div>
              </div>

              <div className="form-row">
                <div className="row-label">Last Name</div>
                <div className="row-content">
                  <input type="text"
                    value={this.state.formValues.lastName}
                    onChange={this.onChangeLastName}></input>
                  <div className="row-content-text">
                    This is only shared once you have a confirmed booking with
                    another Mokbnb user.
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
                    another Mokbnb user.
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
                    We won’t share your private email address with other Mokbnb
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
                    another Mokbnb user. This is how we can all get in touch.
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
                    Mokbnb is built on relationships. Help other people get to
                    know you.
                    <br/><br/>
                    Tell them about the things you like: What are 5 things you
                    can’t live without? Share your favorite travel destinations,
                    books, movies, shows, music, food.
                    <br/><br/>
                    Tell them what it’s like to have you as a guest or host:
                    What’s your style of traveling? Of Mokbnb hosting?
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
                    Mokbnb
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

        <div className="save-profile-btn" onClick={this.onClickSaveBtn}>Save</div>

      </div>
    );
  }


  /*

  Event Callbacks

  */

  onChangeFirstName(evt) {
    let newState = this.state;
    newState.formValues.firstName = evt.target.value;
    this.setState(newState);
  }

  onChangeLastName(evt) {
    let newState = this.state;
    newState.formValues.lastName = evt.target.value;
    this.setState(newState);
  }

  onClickSaveBtn(evt) {
    // console.log('onClickSaveBtn');
    let formValues = this.state.formValues;

    let toUpdate = this.context.userSessionHandler.getSessionAuthValues();
    if(formValues.firstName.trim().length > 0){
      toUpdate.first_name = formValues.firstName.trim();
    }
    if(formValues.lastName.trim().length > 0){
      toUpdate.last_name = formValues.lastName.trim();
    }
    // console.log('toUpdate');
    // console.log(toUpdate);

    $.get('/api/updateUserInfo', toUpdate, (data, status) => {
      if(data.success !== true) {
        // console.log(data);
        console.log('User Information Update Not Successful');
        // $('html, body').animate({ scrollTop: 0 }, 'fast');
      } else if(data.success === true) {
        // console.log(data);
        $('html, body').animate({ scrollTop: 0 }, 'fast');
      }
    });


  }



};
