import React from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';


require("./signup-form.scss");

const FORM_IDS = {
  SIGNUP_SELECTION: 1,
  SIGNUP_WITH_EMAIL: 2
};

export default class SignUpForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeForm: FORM_IDS.SIGNUP_SELECTION
    };
  }

  renderFormBottom() {
    return (
      <div>
        <div className="or-separator"></div>

        <div className="bottom-opts-container">
          <div className="left-text">Already have an Airbnb account?</div>
          <Link to="#" className="login-btn">Log In</Link>
        </div>
      </div>
    );
  }

  renderFormSignUpSelection() {
    return (
      <div>
        <div className="social-buttons">
          <Link to="#" className="btn btn-facebook">Sign Up with Facebook</Link>
          <Link to="#" className="btn btn-google">Sign Up with Google</Link>
        </div>

        <div className="or-separator">
          <span className="or-text">or</span>
        </div>

        <div className="btn btn-signup-with-email"
          onClick={this.handleSignUpWithEmailBtnClick.bind(this)}
        >
          <span>Sign Up with Email</span>
        </div>

        <div className="tos-info">
          <div className="tos-info-text">
            <small>By signing up, I agree to Airbnb's <Link to="#">Term of Service</Link>, <Link
            to="#">Payments Terms of Service</Link>, <Link to="#">Privacy Policy</Link>, <Link
            to="#">Guest Refund Policy</Link>, and <Link to="#">Host Guarantee Terms
            </Link>.</small>
          </div>
          <div className="tos-info-text">
            <small>I also agree to follow Airbnb's <Link to="#">Nondiscrimination Policy</Link> and help our community build a world where people of all backgrounds feel included and respected.</small>
          </div>
        </div>

        {this.renderFormBottom()}

      </div>
    );
  }

  renderFormSignUpWithEmail() {
    return (
      <div>
        <div className="social-links">
          Sign up with <Link to="#">Facebook</Link> or <Link to="#">Google</Link>
        </div>

        <div className="or-separator">
          <span className="or-text">or</span>
        </div>

        <form onSubmit={this.handleSignUpForm.bind(this)}>

          <div className="input-text-boxes">
            <input className="" type="text" placeholder="First name" ref=""/>
            <input className="" type="text" placeholder="Last name" ref=""/>
            <input className="" type="email" placeholder="Email address" ref=""/>
            <input className="" type="password" placeholder="Password" ref=""/>
          </div>

          {/* TODO: Add Birthdat selection and maybe remove receive ... checkbox */}

          <div className="tos-info">
            <div className="tos-info-text">
              <small>By signing up, I agree to Airbnb's <Link to="#">Term of Service</Link>, <Link
              to="#">Payments Terms of Service</Link>, <Link to="#">Privacy Policy</Link>, <Link
              to="#">Guest Refund Policy</Link>, and <Link to="#">Host Guarantee Terms
              </Link>.</small>
            </div>
            <div className="tos-info-text">
              <small>I also agree to follow Airbnb's <Link to="#">Nondiscrimination Policy</Link> and help our community build a world where people of all backgrounds feel included and respected.</small>
            </div>
          </div>

          <div className="btn btn-signup-with-email"
            onClick={this.handleSignUpBtnClick.bind(this)}
          >
            <span>Sign Up</span>
          </div>
        </form>

        {this.renderFormBottom()}

      </div>
    );
  }

  renderForm() {
    switch(this.state.activeForm){
      case FORM_IDS.SIGNUP_SELECTION:
        return this.renderFormSignUpSelection();
        break;
      case FORM_IDS.SIGNUP_WITH_EMAIL:
        return this.renderFormSignUpWithEmail();
        break;
      default:
        return (<div>Form ID not valid</div>);
    };
  }

  render() {
    return (
      <div className='signup-modal' onClick={this.onClickModal.bind(this)}>
        <div className='form-container'>
          {this.renderForm()}
        </div>
      </div>
    );
  }

  handleSignUpForm(event) {
    event.preventDefault();

  }

  onClickModal(event) {
    event.stopPropagation();
  }

  handleSignUpWithEmailBtnClick(event) {
    event.preventDefault();

    this.setState({ activeForm: FORM_IDS.SIGNUP_WITH_EMAIL});
  }

  handleSignUpBtnClick(event) {
    event.preventDefault();

    this.setState({ activeForm: FORM_IDS.SIGNUP_WITH_EMAIL});
  }

};


// <div className="signup-form" onClick={this.onClickLoginForm.bind(this)}>
//   <div className="signup-facebook">Log in with Facebook</div>
//   <div className="signup-google">Log in with Google</div>
//
//   <div className="or-separator">
//     <span className="or-text">or</span>
//   </div>
//
//   <form onSubmit={this.handleLoginForm.bind(this)}>
//     <button className="signup-btn">Sign Up</button>
//
//
//     <div className="tos-info">
//       <div className="tos-info-text">
//         <small>By signing up, I agree to Airbnb's <Link to="#">Term of Service</Link>, <Link
//         to="#">Payments Terms of Service</Link>, <Link to="#">Privacy Policy</Link>, <Link
//         to="#">Guest Refund Policy</Link>, and <Link to="#">Host Guarantee Terms
//         </Link>.</small>
//       </div>
//       <div className="tos-info-text">
//         <small>I also agree to follow Airbnb's <Link to="#">Nondiscrimination Policy</Link> and help our community build a world where people of all backgrounds feel included and respected.</small>
//       </div>
//     </div>
//
//   </form>
//
//
//
//   <div className="or-separator"></div>
//
//   <div className="form-opts-container">
//     <div className="no-account-text">Already have an Airbnb account?</div>
//     <Link to="#" className="login-btn">Log In</Link>
//   </div>
// </div>
