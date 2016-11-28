import React from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';


// require("./inbox.scss");


/*

*/
export default class InboxMessageTile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // sender: '[Name missing]',
      // receiver: '[Name missing]',
      // msgTitle: '[No title]',
      // msgBodySnippet: '[No msg body]'
    };

  }

  renderFromToLabel() {
    let msgData = this.props.msgData;
    if(msgData.sender.user_id === msgData.user_id){
      return (
        <div className='msg-from-to'>
          TO: ({msgData.receiver.fname}){msgData.receiver.email}
        </div>
      );
    }else{
      return (
        <div className='msg-from-to'>
          FROM: ({msgData.sender.fname}){msgData.sender.email}
        </div>
      );
    }
  }

  render() {
    console.log(this.props);
    let sender = '[Sender Data Missing]';
    let receiver = '[Receiver Data Missing]';
    let title = '[Title Data Missing]';
    let body = '[Body Data Missing]';
    if(this.props.msgData !== undefined){
      sender = this.props.msgData.sender.email;
      receiver = this.props.msgData.receiver.email;
      title = this.props.msgData.title;
      body = this.props.msgData.body;
    }
    return (
      <div className='message-tile'>
        {/* <div className='sender'>{sender}</div>
        <div className='receiver'>{receiver}</div> */}
        {this.renderFromToLabel()}
        <div className='msg-title'>{title}</div>
        <div className='msg-body-snippet'>{body}</div>
      </div>
    );
  }

  /*

  Event Callbacks

  */



};
