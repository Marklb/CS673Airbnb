import _ from 'lodash';
import React from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';


require("./modal.scss");

export default class Modal extends React.Component {
  constructor(props) {
    super(props);


    this.state = {

    };
  }

  renderContent() {
    return;
  }

  render() {
    console.log(this.props);
    return (
      <div className={(this.props.isVisible) ? "modal visible" : "modal hidden"}>
        {this.renderContent()}
      </div>
    );
  }

  /*

  Event Callbacks

  */



};
