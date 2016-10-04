import React from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';


require("./signup-form.scss");

// TODO: Get the Email icon for the Sign up with Email button

export default class SignUpForm extends React.Component {

  render() {
    return (
      <div className="signup-form" onClick={this.onClickLoginForm.bind(this)}>
        <input type="checkbox" id="tos-mandatory-checkbox" />
        <label for="tos-mandatory-checkbox">
          <div>
            <div className="tos-mandatory-checkbox-label-text">
              <small>By signing up, I agree to Airbnb's <Link to="#">Term of Service</Link>, <Link
              to="#">Payments Terms of Service</Link>, <Link to="#">Privacy Policy</Link>, <Link
              to="#">Guest Refund Policy</Link>, and <Link to="#">Host Guarantee Terms
              </Link>.</small>
            </div>
            <div className="tos-mandatory-checkbox-label-text">
              <small>I also agree to follow Airbnb's <Link to="#">Nondiscrimination Policy</Link> and help our community build a world where people of all backgrounds feel included and respected.</small>
            </div>
          </div>
        </label>

        <div className="signup-facebook">Sign Up with Facebook</div>
        <div className="signup-google">Sign Up with Google</div>

        <div className="or-separator">
          <span className="or-text">or</span>
        </div>

        <form onSubmit={this.handleLoginForm.bind(this)}>
          <button className="signup-btn">Sign up with Email</button>
        </form>

        <div className="or-separator"></div>

        <div className="form-opts-container">
          <div className="have-account-text">Already have an Airbnb account?</div>
          <Link to="#" className="login-btn">Log in</Link>
        </div>
      </div>
    );
  }

  onClickLoginForm(event) {
    event.stopPropagation();
  }

  handleLoginForm(event) {
    event.preventDefault();

    // this.props.createTask(this.refs.createInput.value);
    // this.refs.createInput.value = '';
  }

};
