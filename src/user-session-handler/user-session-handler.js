import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';

import $ from 'jquery';


const FIRST_NAME_PLACEHOLDER = '[NoName]';

export default class userSessionHandler {
  constructor(reactComponent) {
    // _ prefix indicates private, don't directly reference these variables
    this._reactComponent = reactComponent;
    this._isLoggedIn = false;
    this._authType = undefined;

    this._firstName = FIRST_NAME_PLACEHOLDER;
    this._lastName = undefined;
    this._email = undefined;

    this.attemptPreAuthenticated();
  }

  /*
  Returns whether a user is logged in.
  */
  isLoggedIn() {
    return this._isLoggedIn;
  }

  /*
  options:
    isLoggedIn: (boolean)
  */
  loginSet(options={}) {
    console.log('loginSet');
    console.log(options);
    if(options.isLoggedIn === true || options.isLoggedIn === false){
      this._isLoggedIn = options.isLoggedIn;
    }else{
      this._isLoggedIn = !this._isLoggedIn;
    }

    this._authType = (options.authType !== undefined) ? options.authType : undefined;

    if(options.response !== undefined){
      console.log(options.response);
      switch(options.authType){
        case 'facebook':
          this._email = (options.response.email !== undefined) ?
            options.response.email : undefined;
          this._firstName = (options.response.name !== undefined) ?
            options.response.name.split(' ')[0] : FIRST_NAME_PLACEHOLDER;
          this._lastName = (options.response.name !== undefined) ?
            options.response.name.split(' ')[1] : undefined;
          break;
        case 'google':
          this._firstName = (options.response.profileObj.givenName !== undefined) ?
            options.response.profileObj.givenName : FIRST_NAME_PLACEHOLDER;
          break;
        case 'mokbnb':
          // TODO: Fix this implementation
          this._firstName = (options.response.firstName !== undefined) ?
            options.response.firstName : FIRST_NAME_PLACEHOLDER;
          this._authToken = options.response.authToken;
          this.storeDataToLocal();
          break;
      }
    }


    let newState = this._reactComponent.state;
    newState.userSessionHandler = this;
    this._reactComponent.setState(newState);
  }

  /*

  */
  logout() {
    // console.log('Logout');
    localStorage.removeItem("first_name");
    localStorage.removeItem("auth_type");
    localStorage.removeItem("auth_token");

    this._isLoggedIn = false;
    this._authType = undefined;

    this._firstName = undefined;
    this._lastName = undefined;
    this._email = undefined;

    let newState = this._reactComponent.state;
    newState.userSessionHandler = this;
    this._reactComponent.setState(newState);

    browserHistory.push('/');
  }

  /*

  */
  getFirstName() {
    return this._firstName;
  }

  /*

  */
  getAuthType() {
    return localStorage.getItem('auth_type');
  }

  /*

  */
  getAuthToken() {
    return localStorage.getItem('auth_token');
  }

  /*

  */
  storeDataToLocal() {
    // console.log('storeDataToLocal');
    // console.log(this._firstName);
    // console.log(this._authType);
    // console.log(this._authToken);
    localStorage.setItem('first_name', this._firstName);
    localStorage.setItem('auth_type', this._authType);
    localStorage.setItem('auth_token', this._authToken);
  }

  /*

  */
  attemptPreAuthenticated() {
    this._firstName = localStorage.getItem('first_name');
    this._authType = localStorage.getItem('auth_type');
    this._authToken = localStorage.getItem('auth_token');

    if(this._firstName == 'undefined'
      || this._firstName == undefined
      || this._firstName == null
      || this._firstName == ''){
      return;
    }
    if(this._authType == 'undefined'
      || this._authType == undefined
      || this._authType == null
      || this._authType == ''){
      return;
    }
    if(this._authToken == 'undefined'
      || this._authToken == undefined
      || this._authToken == null
      || this._authToken == ''){
      return;
    }

    $.get('/api/authenticateFromToken', {
        authType: this._authType,
        authToken: this._authToken
    	}, (data, status) => {
        this._firstName = data.first_name;
        this._isLoggedIn = true;

        let newState = this._reactComponent.state;
        newState.userSessionHandler = this;
        this._reactComponent.setState(newState);
    	});
  }


}
