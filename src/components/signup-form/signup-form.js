// TODO: Add tooltip
//           Add facebook and google sign up
//           Link Login button to login form
//           [Maybe] Add weak/strong display under password
import $ from 'jquery';
import _ from 'lodash';
import React from 'react';
import UserSessionHandler from '../../user-session-handler';
import ModalsHandler from '../../modals-handler';

// React Components
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';


require("./signup-form.scss");

/*

*/
const FORM_IDS = {
  SIGNUP_SELECTION: 1,
  SIGNUP_WITH_EMAIL: 2
};

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
YYYY-MM-DD
*/
let getAge = (dateString) => {
    let today = new Date();
    let birthDate = new Date(dateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    let m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

/*

*/
export default class SignUpForm extends React.Component {
  static contextTypes = {
    googleApiClientId: React.PropTypes.string.isRequired,
    facebookApiAppId: React.PropTypes.string.isRequired,
    userSessionHandler: React.PropTypes.instanceOf(UserSessionHandler).isRequired,
    modalsHandler: React.PropTypes.instanceOf(ModalsHandler).isRequired
  };

  constructor(props) {
    super(props);

    this.inputFieldClasses = {
      'default': '',
      'invalid': 'invalid-input',
      'valid': 'valid-input'
    };

    this.state = {
      activeForm: FORM_IDS.SIGNUP_SELECTION,
      hasClickedSignUp: false,

      formFirstNameClassesDefault: ``,
      formFirstNameClasses: this.inputFieldClasses.default,
      formFirstNameRequiredLabelVisible: false,
      isValidFirstNameField: false,
      formValuesFirstName: "",

      formLastNameClassesDefault: ``,
      formLastNameClasses: this.inputFieldClasses.default,
      formLastNameRequiredLabelVisible: false,
      isValidLastNameField: false,
      formValuesLastName: "",

      formEmailNameClassesDefault: ``,
      formEmailNameClasses: this.inputFieldClasses.default,
      formEmailRequiredLabelVisible: false,
      isValidEmailField: false,
      formValuesEmail: "",

      formPasswordClassesDefault: ``,
      formPasswordClasses: this.inputFieldClasses.default,
      formPasswordRequiredLabelVisible: false,
      isValidPasswordField: false,
      formValuesPassword: "",

      formBirthdayRequiredLabelVisible: false,
      formBirthdayMonthClassesDefault: `user_birthday_month`,
      formBirthdayMonthClasses: `user_birthday_month ${this.inputFieldClasses.default}`,
      isValidBirthdayMonthField: false,
      formValuesBirthdayMonth: "",

      formBirthdayDayClassesDefault: `user_birthday_day ${this.inputFieldClasses.default}`,
      formBirthdayDayClasses: `user_birthday_day ${this.inputFieldClasses.default}`,
      isValidBirthdayDayField: false,
      formValuesBirthdayDay: "",

      formBirthdayYearClassesDefault: `user_birthday_year ${this.inputFieldClasses.default}`,
      formBirthdayYearClasses: `user_birthday_year ${this.inputFieldClasses.default}`,
      isValidBirthdayYearField: false,
      formValuesBirthdayYear: ""

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
          <Link to="#" className="login-btn">Log in</Link>
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
        <div className="social-auth-buttons">
          <Link to="#" className="btn auth-btn-facebook">Sign Up with Facebook</Link>
          <Link to="#" className="btn auth-btn-google">Sign Up with Google</Link>
        </div>

        <div className="or-separator">
          <span className="or-text">or</span>
        </div>

        <div className="btn btn-signup-with-email"
          onClick={this.handleSignUpWithEmailBtnClick.bind(this)}
        >
          <span>Sign up with Email</span>
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
            <input className={this.state.formFirstNameClasses}
              type="text"
              placeholder="First name"
              name="user[first_name]"
              value={this.state.formValuesFirstName}
              onChange={this.handleFirstNameValueChange.bind(this)}
              onFocus={this.handleFirstNameFocus.bind(this)}
            />

          {(this.state.formLastNameRequiredLabelVisible === true) ?
              this.renderFieldRequiredLabel('Last name is required.') : null}
            <input className={this.state.formLastNameClasses}
              type="text"
              placeholder="Last name"
              name="user[last_name]"
              value={this.state.formValuesLastName}
              onChange={this.handleLastNameValueChange.bind(this)}
              onFocus={this.handleLastNameFocus.bind(this)}
            />

          {(this.state.formEmailRequiredLabelVisible === true) ?
              this.renderFieldRequiredLabel('Email is required.') : null}
            <input className={this.state.formEmailNameClasses}
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
          </div>

          <div className="birthday-label">
            <span>Birthday</span>
            {/* NOTE: Add tooltip */}
          </div>

          {(this.state.formBirthdayRequiredLabelVisible === true) ?
            this.renderFieldRequiredLabel('Select your birth date to continue.') : null}
          <div className="birthday-selects">
            <select className={this.state.formBirthdayMonthClasses}
              name="user[birthday_month]"
              value={this.state.formValuesBirthdayMonth}
              onChange={this.handleBirthdayMonthValueChange.bind(this)}
              onFocus={this.handleBirthdayFocus.bind(this)}
            >
              <option value>Month</option>
              {MONTHS.map((val, i) => {
                  return <option key={i} value={val}>{val}</option>})}
            </select>

            <select className={this.state.formBirthdayDayClasses}
              name="user[birthday_day]"
              value={this.state.formValuesBirthdayDay}
              onChange={this.handleBirthdayDayValueChange.bind(this)}
              onFocus={this.handleBirthdayFocus.bind(this)}
            >
              <option value>Day</option>
              {_.range(DAYS_RANGE.start, DAYS_RANGE.end+1).map((val, i) => {
                return <option key={i} value={val}>{val}</option>})}
            </select>

            <select className={this.state.formBirthdayYearClasses}
              name="user[birthday_year]"
              value={this.state.formValuesBirthdayYear}
              onChange={this.handleBirthdayYearValueChange.bind(this)}
              onFocus={this.handleBirthdayFocus.bind(this)}
            >
              <option value>Year</option>
              {_.range(YEARS_RANGE.start, YEARS_RANGE.end+1).map((val, i) => {
                return <option key={i} value={val}>{val}</option>})}
            </select>
          </div>

          {/* NOTE: Receive ... checkbox is left out */}

          {this.renderTOS()}

          <div className="btn btn-signup-with-email"
            onClick={this.handleSignUpBtnClick.bind(this)}
          >
            <span>Sign up</span>
          </div>
        </form>

        {this.renderFormBottom()}

      </div>
    );
  }

  /*

  */
  renderFieldRequiredLabel(text) {
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

    // this.setState({ activeForm: FORM_IDS.SIGNUP_WITH_EMAIL});
    let isValid = this.isFormValid();
    this.setState({hasClickedSignUp: true});

  	$.post('/api/signupinfo', {
  		'firstname': this.state.formValuesFirstName,
  		'lastname': this.state.formValuesLastName,
  		'email': this.state.formValuesEmail,
  		'password': this.state.formValuesPassword,
  		'birthdaymonth': this.state.formValuesBirthdayMonth,
  		'birthdayday': this.state.formValuesBirthdayDay,
  		'birthdayyear': this.state.formValuesBirthdayYear,
    	}, (data, status) => {
    		console.log(data);
    		console.log(status);
    		if(data.insert_success == false) {
    			console.log('Signin Not Successful');
    		} else if (data.insert_success == true) {
          this.context.userSessionHandler.loginSet({
            isLoggedIn: true,
            authType: data.auth_type,
            response: {
              firstName: data.first_name,
              authToken: data.auth_token
            }
          });
    			if (this.props.modalVars !== undefined) {
    				this.context.modalsHandler.hideModal(
              this.props.modalVars.containerName, this.props.modalVars.name);
    			}
    		}
    	});
  }

  /*

  */
  handleFirstNameValueChange(event) {
    let value = event.target.value;
    this.setState({formValuesFirstName: value});
    this.validateFirstNameValue(value);
  }

  /*

  */
  handleFirstNameFocus(event) {
    if(this.state.formFirstNameRequiredLabelVisible === true){
      this.setState({formFirstNameRequiredLabelVisible: false});
    }
  }

  /*

  */
  handleLastNameValueChange(event) {
    let value = event.target.value;
    this.setState({formValuesLastName: value});
    this.validateLastNameValue(value);
  }

  /*

  */
  handleLastNameFocus(event) {
    if(this.state.formLastNameRequiredLabelVisible === true){
      this.setState({formLastNameRequiredLabelVisible: false});
    }
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

  */
  handleBirthdayMonthValueChange(event) {
    let value = event.target.value;
    this.setState({formValuesBirthdayMonth: value});
    this.validateBirthdayMonthValue(value);
  }

  /*

  */
  handleBirthdayDayValueChange(event) {
    let value = event.target.value;
    this.setState({formValuesBirthdayDay: value});
    this.validateBirthdayDayValue(value);
  }

  /*

  */
  handleBirthdayYearValueChange(event) {
    let value = event.target.value;
    this.setState({formValuesBirthdayYear: value});
    this.validateBirthdayYearValue(value);
  }

  /*

  */
  handleBirthdayFocus(event) {
    if(this.state.formBirthdayRequiredLabelVisible === true){
      this.setState({formBirthdayRequiredLabelVisible: false});
    }
  }


  /*

  Form Validations

  */
  isFormValid() {
    let isValid = true;
    let newState = {};

    if(this.state.isValidFirstNameField === false){
      newState.formFirstNameRequiredLabelVisible = true;
      newState.formFirstNameClasses =
        `${this.state.formFirstNameClassesDefault} ${this.inputFieldClasses.invalid}`;
      isValid = false;
    }else{
      newState.formFirstNameClasses =
        `${this.state.formFirstNameClassesDefault} ${this.inputFieldClasses.valid}`;
    }

    if(this.state.isValidLastNameField === false){
      newState.formLastNameRequiredLabelVisible = true;
      newState.formLastNameClasses =
        `${this.state.formLastNameClassesDefault} ${this.inputFieldClasses.invalid}`;
      isValid = false;
    }else{
      newState.formLastNameClasses =
        `${this.state.formLastNameClassesDefault} ${this.inputFieldClasses.valid}`;
    }

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

    if(this.state.isValidBirthdayMonthField === false
      || this.state.isValidBirthdayDayField === false
      || this.state.isValidBirthdayYearField === false){
      newState.formBirthdayRequiredLabelVisible = true;
      isValid = false;
    }

    if(this.state.isValidBirthdayMonthField === false){
      newState.formBirthdayMonthClasses =
        `${this.state.formBirthdayMonthClassesDefault} ${this.inputFieldClasses.invalid}`;
    }else{
      newState.formBirthdayMonthClasses =
        `${this.state.formBirthdayMonthClassesDefault} ${this.inputFieldClasses.valid}`;
    }

    if(this.state.isValidBirthdayDayField === false){
      newState.formBirthdayDayClasses =
        `${this.state.formBirthdayDayClassesDefault} ${this.inputFieldClasses.invalid}`;
    }else{
      newState.formBirthdayDayClasses =
        `${this.state.formBirthdayDayClassesDefault} ${this.inputFieldClasses.valid}`;
    }

    if(this.state.isValidBirthdayYearField === false){
      newState.formBirthdayYearClasses =
        `${this.state.formBirthdayYearClassesDefault} ${this.inputFieldClasses.invalid}`;
    }else{
      newState.formBirthdayYearClasses =
        `${this.state.formBirthdayYearClassesDefault} ${this.inputFieldClasses.valid}`;
    }

    if(isValid === true){
      let year = this.state.formValuesBirthdayYear;
      let month = this.state.formValuesBirthdayMonth;
      let day = this.state.formValuesBirthdayDay;
      let age = getAge(`${year}/${month}/${day}`);
      if(age < 18){
        isValid = false;
      }
    }

    this.setState(newState);
    return isValid;
  }

  validateFirstNameValue(value) {
    if(value.trim().length > 0){
      this.setState({isValidFirstNameField: true});
    }else{
      this.setState({isValidFirstNameField: false});
    }
  }

  validateLastNameValue(value) {
    if(value.trim().length > 0){
      this.setState({isValidLastNameField: true});
    }else{
      this.setState({isValidLastNameField: false});
    }
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

  validateBirthdayMonthValue(value) {
    if(value.trim().length > 0 && MONTHS.indexOf(value) !== -1){
      this.setState({isValidBirthdayMonthField: true});
    }else{
      this.setState({isValidBirthdayMonthField: false});
    }
  }

  validateBirthdayDayValue(value) {
    if(value.trim().length > 0 && (DAYS_RANGE.start <= parseInt(value)
      && parseInt(value) <= DAYS_RANGE.end)){
      this.setState({isValidBirthdayDayField: true});
    }else{
      this.setState({isValidBirthdayDayField: false});
    }
  }

  validateBirthdayYearValue(value) {
    if(value.trim().length > 0 && (YEARS_RANGE.start <= parseInt(value)
      && parseInt(value) <= YEARS_RANGE.end)){
      this.setState({isValidBirthdayYearField: true});
    }else{
      this.setState({isValidBirthdayYearField: false});
    }
  }

};
