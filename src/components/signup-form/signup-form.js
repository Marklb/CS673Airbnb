import _ from 'lodash';
import React from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';


require("./signup-form.scss");

/*

*/
const FORM_IDS = {
  SIGNUP_SELECTION: 1,
  SIGNUP_WITH_EMAIL: 2
};

/*

*/
export default class SignUpForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeForm: FORM_IDS.SIGNUP_WITH_EMAIL,
      isValidFirstNameField: false,
      isValidLastNameField: false,
      isValidEmailField: false,
      isValidPasswordField: false,
      isValidMonthField: false,
      isValidDayField: false,
      isValidYearField: false,
      formValuesFirstName: "",
      formValuesLastName: "",
      formValuesEmail: "",
      formValuesPassword: "",
      formValuesBirthdayMonth: "",
      formValuesBirthdayDay: "",
      formValuesBirthdayYear: "",
      formFirstNameRequiredLabelVisible: false,
      formLastNameRequiredLabelVisible: false,
      formEmailRequiredLabelVisible: false,
      formPasswordRequiredLabelVisible: false,
      formBirthdayRequiredLabelVisible: false
    };
  }

  /*

  Render functions

  */

  /*

  */
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

  /*

  */
  renderTOS() {
    return (
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
    );
  }

  /*

  */
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

  /*

  */
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
            {(this.state.formFirstNameRequiredLabelVisible === true) ?
              this.renderFieldRequiredLabel('First name is required.') : null}
            <input className="" type="text"
              placeholder="First name"
              name="user[first_name]"
              value={this.state.formValuesFirstName}
              onChange={this.handleFirstNameValueChange.bind(this)}
            />

          {(this.state.formLastNameRequiredLabelVisible === true) ?
              this.renderFieldRequiredLabel('Last name is required.') : null}
            <input className="" type="text"
              placeholder="Last name"
              name="user[last_name]"
              value={this.state.formValuesLastName}
              onChange={this.handleLastNameValueChange.bind(this)}
            />

          {(this.state.formEmailRequiredLabelVisible === true) ?
              this.renderFieldRequiredLabel('Email is required.') : null}
            <input className="" type="email"
              placeholder="Email address"
              name="user[email]"
              value={this.state.formValuesEmail}
              onChange={this.handleEmailValueChange.bind(this)}
            />

          {(this.state.formPasswordRequiredLabelVisible === true) ?
              this.renderFieldRequiredLabel('Password is required.') : null}
            <input className="" type="password"
              placeholder="Password"
              name="user[password]"
              value={this.state.formValuesPassword}
              onChange={this.handlePasswordValueChange.bind(this)}
            />
          </div>

          <div className="birthday-label">
            <span>Birthday</span>
            {/* NOTE: Add tooltip */}
          </div>

          {(this.state.formBirthdayRequiredLabelVisible === true) ?
            this.renderFieldRequiredLabel('Select your birth date to continue.') : null}
          <div className="birthday-selects">
            <select className="user_birthday_month"
              name="user[birthday_month]"
              value={this.state.formValuesBirthdayMonth}
              onChange={this.handleBirthdayMonthValueChange.bind(this)}
            >
              <option value>Month</option>
              {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August',
                'September', 'October', 'November', 'December'].map((val, i) => {
                  return <option key={i} value={val}>{val}</option>})}
            </select>

            <select className="user_birthday_day"
              name="user[birthday_day]"
              value={this.state.formValuesBirthdayDay}
              onChange={this.handleBirthdayDayValueChange.bind(this)}
            >
              <option value>Day</option>
              {_.range(1, 32).map((val, i) => {return <option key={i} value={val}>{val}</option>})}
            </select>

            <select className="user_birthday_year"
              name="user[birthday_year]"
              value={this.state.formValuesBirthdayYear}
              onChange={this.handleBirthdayYearValueChange.bind(this)}
            >
              <option value>Year</option>
              {_.range(2016, 1895).map((val, i) => {return <option key={i} value={val}>{val}</option>})}
            </select>
          </div>

          {/* NOTE: Receive ... checkbox is left out */}

          {this.renderTOS()}

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

  /*

  */
  renderFieldRequiredLabel(text) {
    console.log(text);
    return <div className="field-required-label">{text}</div>
  }

  /*

  */
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

  /*

  */
  render() {
    return (
      <div className='signup-modal' onClick={this.onClickModal.bind(this)}>
        <div className='form-container'>
          {this.renderForm()}
        </div>
      </div>
    );
  }

  /*

  Event Callbacks

  */

  /*

  */
  handleSignUpForm(event) {
    event.preventDefault();

  }

  /*

  */
  onClickModal(event) {
    event.stopPropagation();
  }

  /*

  */
  handleSignUpWithEmailBtnClick(event) {
    event.preventDefault();

    this.setState({ activeForm: FORM_IDS.SIGNUP_WITH_EMAIL});
  }

  /*

  */
  handleSignUpBtnClick(event) {
    event.preventDefault();

    this.setState({ activeForm: FORM_IDS.SIGNUP_WITH_EMAIL});
  }

  /*

  */
  handleFirstNameValueChange(event) {
    this.setState({formValuesFirstName: event.target.value});
  }

  /*

  */
  handleLastNameValueChange(event) {
    this.setState({formValuesLastName: event.target.value});
  }

  /*

  */
  handleEmailValueChange(event) {
    this.setState({formValuesEmail: event.target.value});
  }

  /*

  */
  handlePasswordValueChange(event) {
    this.setState({formValuesPassword: event.target.value});
  }

  /*

  */
  handleBirthdayMonthValueChange(event) {
    this.setState({formValuesBirthdayMonth: event.target.value});
  }

  /*

  */
  handleBirthdayDayValueChange(event) {
    this.setState({formValuesBirthdayDay: event.target.value});
  }

  /*

  */
  handleBirthdayYearValueChange(event) {
    this.setState({formValuesBirthdayYear: event.target.value});
  }


  /*

  Form Validations

  */
  validateForm() {
    this.validateFirstNameValue();
    this.validateLastNameValue();
    this.validateEmailValue();
    this.validatePasswordValue();
    this.validateBirthdayMonthValue();
    this.validateBirthdayDayValue();
    this.validateBirthdayYearValue();
  }

  validateFirstNameValue() {

  }

  validateLastNameValue() {

  }

  validateEmailValue() {

  }

  validatePasswordValue() {

  }

  validateBirthdayMonthValue() {

  }

  validateBirthdayDayValue() {

  }

  validateBirthdayYearValue() {

  }

};
