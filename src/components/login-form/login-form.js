import React from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';


require("./login-form.scss");

export default class LoginForm extends React.Component {

  render() {
    return (
      <div className="login-form" onClick={this.onClickLoginForm.bind(this)}>
        <div className="login-facebook">Log in with Facebook</div>
        <div className="login-google">Log in with Google</div>

        <div className="or-separator">
          <span className="or-text">or</span>
        </div>

        <form onSubmit={this.handleLoginForm.bind(this)}>
          <input className="login" type="text" placeholder="Email Address" ref="emailAddressInput"/>
          <input className="password" type="text" placeholder="Password" ref="passwordInput"/>

          <div className="form-opts-container">
            <label>
              <input className="remember-me" type="checkbox" value="true" />Remember me
            </label>
            <Link to="#" className="forgot-password">Forgot password?</Link>
          </div>

          <button className="login-btn">Log in</button>
        </form>

        <div className="or-separator"></div>

        <div className="form-opts-container">
          <div className="no-account-text">Don't have an account?</div>
          <Link to="#" className="sign-up-btn">Sign up</Link>
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
