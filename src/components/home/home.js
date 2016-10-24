import React from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';

// Javascript modules
import _ from 'lodash';

// React Components
import {DateRangePicker} from 'react-dates';

require("./home.scss");
require("../top-header/top-header.scss");

/*
Home page component
*/
export default class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      focusedInput: null,
      startDate: null,
      endDate: null,
    };
  }



  render() {
    return (
      <div>
        <center><h1>Live There</h1></center>

        <div className="search-bar-wrapper">
          <form className="search-form">

            <div className="search-bar">
              <div className="search-bar-icon"></div>
              <input type="text" placeholder="Where to?"
                autoComplete="off"
                name="location"
                id="header-search-form"
                className="location"
                onKeyPress={this.onKeyPressSearchInput.bind(this)}
                />

              <DateRangePicker
                onDatesChange={this.onDatesChange.bind(this)}
                onFocusChange={this.onFocusChange.bind(this)}
                focusedInput={this.state.focusedInput}
                startDate={this.state.startDate}
                endDate={this.state.endDate}
                />

            </div>
          </form>
        </div>

      </div>
    );
  }

  /*

  Event Callbacks

  */
  onDatesChange({ startDate, endDate }) {
    this.setState({ startDate, endDate });
  }

  onFocusChange(focusedInput) {
    this.setState({ focusedInput });
  }

  onKeyPressSearchInput(event){
    console.log('Clicked Enter');
    console.log(event.target.value);
    // console.log(event.charCode);
    if(event.charCode === 13){
      event.preventDefault();

      // $.get(`/s/${event.target.value}`);
      // console.log(this.state.searchInputText);

      let url = `/s/${event.target.value}`;
      // console.log(`Going to ${url}`);

      // Navigate to url (Makes page refresh)
      // window.location.href = url;

      // Navigate to url (Page does not refresh)
      history.pushState(null, null, url);

      // Clearing the text manually since the page isn't refreshing
      event.target.value = '';
    }

  }



};
