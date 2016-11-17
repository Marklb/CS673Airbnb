import React from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';

import $ from 'jquery';
import UserSessionHandler from '../../user-session-handler';

require("./new-message-form.scss");

/*

*/
export default class NewMessageForm extends React.Component {
  static contextTypes = {
    userSessionHandler: React.PropTypes.instanceOf(UserSessionHandler).isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      vfMsgRecipient: 'JohnDoe@VIP.com',
      // vfMsgRecipient: 'JamesBond@Agent.com',
      fvMsgTitle: '',
      fvMsgBody: ''
    };

    this.handleMsgRecipientValueChange = this.handleMsgRecipientValueChange.bind(this);
    this.handleMsgRecipientFocus = this.handleMsgRecipientFocus.bind(this);
    this.handleMsgTitleValueChange = this.handleMsgTitleValueChange.bind(this);
    this.handleMsgTitleFocus = this.handleMsgTitleFocus.bind(this);
    this.onChangeMsgBodyInput = this.onChangeMsgBodyInput.bind(this);
    this.onClickSendMsg = this.onClickSendMsg.bind(this);
  }

  render() {
    return (
      <div className='new-message-form'>
        <input className='mokbnb-input'
          type="text"
          placeholder="Recipient..."
          name="msg_recipient"
          value={this.state.vfMsgRecipient}
          onChange={this.handleMsgRecipientValueChange.bind(this)}
          onFocus={this.handleMsgRecipientFocus.bind(this)} />
        <input className='mokbnb-input'
          type="text"
          placeholder="Message title..."
          name="msg_title"
          value={this.state.fvMsgTitle}
          onChange={this.handleMsgTitleValueChange.bind(this)}
          onFocus={this.handleMsgTitleFocus.bind(this)} />
        <textarea className='mokbnb-input'
          placeholder="Message Body..."
          value={this.state.fvMsgBody}
          onChange={this.onChangeMsgBodyInput}></textarea>
        <div className='bottom-btns'>
          <div className='btn send-message-btn'
            onClick={this.onClickSendMsg}>Send</div>
        </div>
      </div>
    );
  }

  /*

  Event Callbacks

  */
  handleMsgRecipientValueChange(evt) {
    this.setState({vfMsgRecipient: evt.target.value});
  }

  handleMsgRecipientFocus(evt) {

  }
  handleMsgTitleValueChange(evt) {
    this.setState({fvMsgTitle: evt.target.value});
  }

  handleMsgTitleFocus(evt) {

  }

  onChangeMsgBodyInput(evt) {
    this.setState({fvMsgBody: evt.target.value});
  }

  onClickSendMsg(evt) {
    let recipient = this.state.vfMsgRecipient;
    let title = this.state.fvMsgTitle;
    let body = this.state.fvMsgBody;
    if(recipient.trim().length === 0
      || title.trim().length === 0
      || body.trim().length === 0) return;
    console.log('Send Message');
    console.log(`recipient: ${recipient}`);
    console.log(`title: ${title}`);
    console.log(`body: ${body}`);

    // console.log(this.context.userSessionHandler.getSessionAuthValues());

    let session = this.context.userSessionHandler.getSessionAuthValues();
    // let sendData = this.context.userSessionHandler.getSessionAuthValues();
    let sendData = {};
    sendData.authToken = session.authToken;
    sendData.authType = session.authType;
    sendData.msgRecipient = recipient;
    sendData.msgTitle = title;
    sendData.msgBody = body;
    console.log(sendData);

    $.get('/api/add_new_message', sendData, (data, status) => {
      if(data.success === false) {
        console.log('Message Not Sent');
      } else {
        console.log('Message Sent');
      }
    });

  }



};
