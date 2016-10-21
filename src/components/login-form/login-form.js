// TODO: Add tooltip
import $ from 'jquery';
import React from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';

import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';

import Modal from '../modal/modal';

require("./login-form.scss");

const GOOGLE_API_CLIENT_ID = '997870016673-18k8dg853j7uau7ol95juckeqoarhq23.apps.googleusercontent.com';
const FACEBOOK_API_APP_ID = '193972817678388';

export default class LoginForm extends Modal {
  constructor(props) {
    super(props);

    this.inputFieldClasses = {
      'default': '',
      'invalid': 'invalid-input',
      'valid': 'valid-input'
    };

    this.state = {
      formEmailClassesDefault: `user_email`,
      formEmailClasses: `user_email ${this.inputFieldClasses.default}`,
      formEmailRequiredLabelVisible: false,
      isValidEmailField: false,
      formValuesEmail: "",

      formPasswordClassesDefault: `user_password`,
      formPasswordClasses: `user_password ${this.inputFieldClasses.default}`,
      formPasswordRequiredLabelVisible: false,
      isValidPasswordField: false,
      formValuesPassword: "",

      authedIdGoogle: null,
      authedIdFacebook: null
    };
  }

  componentDidMount() {

  }

  /*

  */
  renderFieldRequiredLabel(text) {
    return <div className="field-required-label">{text}</div>
  }

  /*

  */
  renderFormBottom() {
    return (
      <div>
        <div className="or-separator"></div>

        <div className="bottom-opts-container">
          <div className="left-text">Don't have an account?</div>
          <Link to="#" className="signup-btn">Sign Up</Link>
        </div>
      </div>
    );
  }

  renderContent() {
    return (
      <div className="modal login-form" onClick={this.onClickLoginForm.bind(this)}>
        <div className='form-container'>
          <div className="social-auth-buttons">
            <FacebookLogin
              appId={FACEBOOK_API_APP_ID}
              autoLoad={true}
              textButton="Log in with Facebook"
              fields="name,email,picture"
              callback={this.responseFacebook.bind(this)}
              cssClass="btn auth-btn-facebook"
              icon="fa-facebook"
            />
            <GoogleLogin
              clientId={GOOGLE_API_CLIENT_ID}
              className="btn auth-btn-google"
              buttonText="Login with google"
              onSuccess={this.responseGoogle.bind(this)}
              onFailure={this.responseGoogle.bind(this)}
            >
              <div className="icon-google" />
              <span>Log in with Google</span>
            </GoogleLogin>
          </div>

          <div className="or-separator">
            <span className="or-text">or</span>
          </div>

          <form onSubmit={this.handleLoginForm.bind(this)}>
              {(this.state.formEmailRequiredLabelVisible === true) ?
                  this.renderFieldRequiredLabel('Email is required.') : null}
                <input className={this.state.formEmailClasses}
                  type="email"
                  placeholder="Email Address"
                  name="user[email]"
                  value={this.state.formValuesEmail}
                  onChange={this.handleEmailValueChange.bind(this)}
                  onFocus={this.handleEmailFocus.bind(this)}
                />

              {(this.state.formPasswordRequiredLabelVisible === true) ?
                  this.renderFieldRequiredLabel('Password is required.') : null}
                <input className={this.state.formPasswordClasses}
                  type="password"
                  placeholder="Password"
                  name="user[password]"
                  value={this.state.formValuesPassword}
                  onChange={this.handlePasswordValueChange.bind(this)}
                  onFocus={this.handlePasswordFocus.bind(this)}
                />

            <div className="form-opts-container">
              <label>
                <input className="remember-me" type="checkbox" />Remember me
              </label>
              <Link to="#" className="forgot-password">Forgot password?</Link>
            </div>

            <div className="btn btn-login"
              onClick={this.onClickLoginButton.bind(this)}
            >
              <span>Log in</span>
            </div>
          </form>

          {this.renderFormBottom()}
        </div>
      </div>
    );
  }

  /*

  Event Callbacks

  */

  /*

  */
  responseGoogle(response) {
    console.log(response);
    this.setState({authedIdGoogle: response});
  }

  /*

  */
  responseFacebook(response) {
    console.log(response);
    this.setState({authedIdFacebook: response});
  }

  /*

  */
  onClickLoginForm(event) {
    event.stopPropagation();
  }

  /*

  */
  handleLoginForm(event) {
    event.preventDefault();

    // this.props.createTask(this.refs.createInput.value);
    // this.refs.createInput.value = '';
  }

  /*
  NOTE: Will be removed
  */
  // onClickLoginForm2(event) {
  //   event.stopPropagation();
  //   console.log(this.state.authedIdGoogle);
  //   console.log(gapi.auth2.getAuthInstance());
  //   var auth2 = gapi.auth2.getAuthInstance();
  //   auth2.signOut().then(function () {
  //       console.log('User signed out.');
  //   });
  //
  // }

  onClickLoginButton(event) {
    event.preventDefault();

    let isValid = this.isFormValid();

  	if(isValid === true){
  		$.post('/api/verifyLogin', {
  			'email': this.state.formValuesEmail,
  			'password': this.state.formValuesPassword
  		}, (data, status) => {
  			//console.log(data);
  			// console.log(status);
  			if(data.veri_success == false) console.log('Login Not Successful');
  			// If log In was successful then hide the modals which will hide the login model.
  			// May switch this to be more specific instead of all is needed.
  			this.props.hideAllModals();
  			// this.props.isLoggedIn = true;
  			this.props.loginSwitch();
  		});
  	}else{

  	}

    this.setState({hasClickedSignUp: true});
  }

  /*

  */
  handleEmailValueChange(event) {
    let value = event.target.value;
    this.setState({formValuesEmail: value});
    this.validateEmailValue(value);
  }

  /*

  */
  handleEmailFocus(event) {
    if(this.state.formEmailRequiredLabelVisible === true){
      this.setState({formEmailRequiredLabelVisible: false});
    }
  }

  /*

  */
  handlePasswordValueChange(event) {
    let value = event.target.value;
    this.setState({formValuesPassword: value});
    this.validatePasswordValue(value);
  }

  /*

  */
  handlePasswordFocus(event) {
    if(this.state.formPasswordRequiredLabelVisible === true){
      this.setState({formPasswordRequiredLabelVisible: false});
    }
  }

  /*

  Form Validations

  */
  isFormValid() {
    let isValid = true;
    let newState = {};

    if(this.state.isValidEmailField === false){
      newState.formEmailRequiredLabelVisible = true;
      newState.formEmailClasses =
        `${this.state.formEmailClassesDefault} ${this.inputFieldClasses.invalid}`;
      isValid = false;
    }else{
      newState.formEmailClasses =
        `${this.state.formEmailClassesDefault} ${this.inputFieldClasses.valid}`;
    }

    if(this.state.isValidPasswordField === false){
      newState.formPasswordRequiredLabelVisible = true;
      newState.formPasswordClasses =
        `${this.state.formPasswordClassesDefault} ${this.inputFieldClasses.invalid}`;
      isValid = false;
    }else{
      newState.formPasswordClasses =
        `${this.state.formPasswordClassesDefault} ${this.inputFieldClasses.valid}`;
    }


    this.setState(newState);
    return isValid;
  }

  validateEmailValue(value) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(re.test(value) === true){
      this.setState({isValidEmailField: true});
    }else{
      this.setState({isValidEmailField: false});
    }
  }

  validatePasswordValue(value) {
    if(value.trim().length > 0){
      this.setState({isValidPasswordField: true});
    }else{
      this.setState({isValidPasswordField: false});
    }
  }

};
