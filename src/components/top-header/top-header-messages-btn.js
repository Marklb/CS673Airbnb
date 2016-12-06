import React from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';

import $ from 'jquery';
import UserSessionHandler from '../../user-session-handler';

import TopHeaderDropdownButton from './top-header-dropdown-button';

export default class TopHeaderMessagesBtn extends TopHeaderDropdownButton {
  static contextTypes = {
    userSessionHandler: React.PropTypes.instanceOf(UserSessionHandler).isRequired
  };

  constructor(props) {
    super(props);

  }

  componentDidMount() {
    // Get the users messages
    let sendData = this.context.userSessionHandler.getSessionAuthValues();
    $.get('/api/get_user_messages', sendData, (data, status) => {
      console.log('Mesages:');
      console.log(status);
      console.log(data);
      this.setState({msgs: data.msgs});
    });
  }

  renderButton() {
    return (<div>Messages</div>);
  }

  renderMsgs() {
    return (
      <div>
        {this.state.msgs.map((val, i) => {
          return (
          <div key={i}>
            <div>{val.title}</div>
          </div>
          );
        })}
      </div>
    );
  }

  renderDropdownContent() { 
    return (
      <div>
        {(this.state !== undefined && this.state.msgs !== undefined) ? this.renderMsgs() : null}
      </div>
    );
  }


};
