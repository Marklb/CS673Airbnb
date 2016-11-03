import React from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';

// Javascript Modules
import $ from 'jquery';
import UserSessionHandler from '../../user-session-handler';
import ModalsHandler from '../../modals-handler';

// React Components
import DashboardContainer from '../dashboard-container';

require("./users-notifications.scss");

/*

*/
export default class UsersNotifications extends React.Component {
  static contextTypes = {
    userSessionHandler: React.PropTypes.instanceOf(UserSessionHandler).isRequired,
    modalsHandler: React.PropTypes.instanceOf(ModalsHandler).isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      formValuesOldPassword: '',
      formValuesNewPassword: '',
      formValuesConfirmPassword: '',
      passwordInputErrorMsg: ''
    };

    this.onClickDisableAccount = this.onClickDisableAccount.bind(this);
    this.handleOldPasswordValueChange = this.handleOldPasswordValueChange.bind(this);
    this.handleNewPasswordValueChange = this.handleNewPasswordValueChange.bind(this);
    this.handleConfirmPasswordValueChange = this.handleConfirmPasswordValueChange.bind(this);
    this.onClickUpdatePassword = this.onClickUpdatePassword.bind(this);
  }



  render() {
    return (
      <DashboardContainer headerTab='account' >
        <div>
          Account<br/><br/>
          <div>{this.state.passwordInputErrorMsg}</div>
          Old Password
          <input type="password"
            name="user[old_password]"
            value={this.state.formValuesOldPassword}
            onChange={this.handleOldPasswordValueChange.bind(this)}/><br/>
          New Password
          <input type="password"
            name="user[new_password]"
            value={this.state.formValuesNewPassword}
            onChange={this.handleNewPasswordValueChange.bind(this)}/><br/>
          Confirm Password
          <input type="password"
            name="user[confirm_password]"
            value={this.state.formValuesConfirmPassword}
            onChange={this.handleConfirmPasswordValueChange.bind(this)}/><br/>

          <button onClick={this.onClickUpdatePassword}>Update Password</button>

          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <button onClick={this.onClickDisableAccount}>Disable Account</button>
        </div>
      </DashboardContainer>
    );
  }

  /*

  Event Callbacks

  */
  handleOldPasswordValueChange(e) {
    let value = e.target.value;
    this.setState({formValuesOldPassword: value});
  }

  handleNewPasswordValueChange(e) {
    let value = e.target.value;
    this.setState({formValuesNewPassword: value});
  }

  handleConfirmPasswordValueChange(e) {
    let value = e.target.value;
    this.setState({formValuesConfirmPassword: value});
  }

  onClickUpdatePassword(e) {
    if(this.state.formValuesNewPassword===this.state.formValuesConfirmPassword){
      this.setState({passwordInputErrorMsg: ""});
      if(this.state.formValuesOldPassword.length > 0
        && this.state.formValuesNewPassword.length > 0
        && this.state.formValuesConfirmPassword.length > 0){
        let reqData = this.context.userSessionHandler.getSessionAuthValues();
        reqData.old_password = this.state.formValuesOldPassword;
        reqData.new_password = this.state.formValuesNewPassword;
        $.get('/api/UpdateUserPassword',
          reqData,
          (data, status) => {
          if(data.success === false) {
            console.log('Login Not Successful');
          } else {
            this.setState({
              formValuesOldPassword: "",
              formValuesNewPassword: "",
              formValuesConfirmPassword: ""
            });
          }
        });
      }
    }else{
      this.setState({passwordInputErrorMsg: "Passwords don't match"});
    }
  }



  onClickDisableAccount(e) {
    $.get('/api/disableUserAccount',
      this.context.userSessionHandler.getSessionAuthValues(),
      (data, status) => {
      if(data.success === false) {
        console.log('Login Not Successful');
      } else {
        // If log In was successful then hide the modals which will hide the login model.
        // May switch this to be more specific instead of all is needed.
        // this.context.modalsHandler.hideModal(this.props.modalVars.containerName, this.props.modalVars.name);
        this.context.userSessionHandler.logout();
      }
    });
  }



};
