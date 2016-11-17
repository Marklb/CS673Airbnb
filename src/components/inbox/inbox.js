import React from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';

import DashboardContainer from '../dashboard-container';
import ReactModal from 'react-modal';
import NewMessageForm from '../new-message-form'


require("./inbox.scss");

/*

*/
export default class Inbox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isNewMessageModalOpen: true
    };

    this.onCloseNewMessageModal = this.onCloseNewMessageModal.bind(this);
  }

  renderNewMessage() {
    return (
      <div className='input-container'>
        <ReactModal
          className='content new-message-modal'
          overlayClassName='overlay'
          isOpen={this.state.isNewMessageModalOpen}
          onRequestClose={this.onCloseNewMessageModal}>
          <NewMessageForm></NewMessageForm>
        </ReactModal>
      </div>
    );
  }

  render() {
    return (
      <DashboardContainer headerTab='inbox' >
        <div>
          Inbox
          {this.renderNewMessage()}
        </div>
      </DashboardContainer>
    );
  }


  onCloseNewMessageModal() {
    this.setState({isNewMessageModalOpen: false});
  }

  /*

  Event Callbacks

  */



};
