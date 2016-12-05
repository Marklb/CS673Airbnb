import React from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';

import $ from 'jquery';
import UserSessionHandler from '../../user-session-handler';

import DashboardContainer from '../dashboard-container';
import ReactModal from 'react-modal';
import NewMessageForm from '../new-message-form';
import InputMessageTile from './inbox-message-tile';

require("./inbox.scss");


/*

*/
export default class Inbox extends React.Component {
  static contextTypes = {
    userSessionHandler: React.PropTypes.instanceOf(UserSessionHandler).isRequired
  };

  static FILTERS = {
    ALL_MESSAGES: 'All Messages',
    STARRED: 'Starred',
    UNREAD: 'Unread',
    RESERVATIONS: 'Reservations',
    PENDING_REQUESTS: 'Pending Requests',
    ARCHIVED: 'Archived'
  }

  constructor(props) {
    super(props);

    this.state = {
      inboxFilter: Inbox.FILTERS.ALL_MESSAGES,
      msgs: [],
      isNewMessageModalOpen: false
    };

    // this.msgs = [];

    this.handleInboxFilterSelectValueChange = this.handleInboxFilterSelectValueChange.bind(this);
    this.onClickNewMsgBtn = this.onClickNewMsgBtn.bind(this);
    this.onCloseNewMessageModal = this.onCloseNewMessageModal.bind(this);
  }

  componentWillMount() {
    // Get the users messages
    let sendData = this.context.userSessionHandler.getSessionAuthValues();
    $.get('/api/get_user_messages', sendData, (data, status) => {
      console.log('Mesages:');
      console.log(status);
      console.log(data);
      this.setState({msgs: data.msgs});
    });
  }

  renderNewMessageForm() {
    return (
      <ReactModal
        className='content new-message-modal'
        overlayClassName='overlay'
        isOpen={this.state.isNewMessageModalOpen}
        onRequestClose={this.onCloseNewMessageModal}>
        <NewMessageForm></NewMessageForm>
      </ReactModal>
    );
  }

  render() {
    console.log(this.state);
    return (
      <DashboardContainer headerTab='inbox' >
        <div className='inbox-container'>
          {/* */}
          <div className='inbox-vertical-menu'>
            <select className='mokbnb-input'
              value={this.state.inboxFilter}
              onChange={this.handleInboxFilterSelectValueChange}>
              {Object.keys(Inbox.FILTERS).map((val, i) => {
                return (
                  <option key={i} value={val}>{Inbox.FILTERS[val]}</option>
                )}
              )}
            </select>
            <div className='new-msg-btn'
              onClick={this.onClickNewMsgBtn}>New Message</div>
          </div>
          {/* */}
          <div className='inbox-messages-list'>
            {this.state.msgs.map((val, i) => {
              return (<InputMessageTile key={i}
                msgData={val}></InputMessageTile>);
            })}
          </div>


          {/* */}
          {this.renderNewMessageForm()}
        </div>
      </DashboardContainer>
    );
  }

  showNewMsgForm(evt) {

  }

  hideNewMsgForm(evt) {

  }

  /*

  Event Callbacks

  */
  handleInboxFilterSelectValueChange(evt) {

  }

  onClickNewMsgBtn(evt) {
    this.setState({isNewMessageModalOpen: true});
  }

  onCloseNewMessageModal(evt) {
    this.setState({isNewMessageModalOpen: false});
  }


};
