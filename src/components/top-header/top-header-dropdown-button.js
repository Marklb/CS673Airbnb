import React from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';

export default class TopHeaderDropdownButton extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      dropdownContainerVisibility: true
    };
  }

  renderButton() {
    // return;
  }

  renderDropdownContent() {
    // return;
  }

  render() {
    let dropdownContainerClassName = this.state.dropdownContainerVisibility ?
      'dropdown-container' : 'dropdown-container visible';

    // let cn = (this.props) ? "right-btn "+this.props.className : "right-btn";
    return (
      <div
        className={(this.props.className) ? "right-btn "+this.props.className : "right-btn"}
        onMouseOver={this.onMouseOver.bind(this)}
        onMouseOut={this.onMouseOut.bind(this)}
      >
        {this.renderButton()}
        <div className={dropdownContainerClassName}>
          {this.renderDropdownContent()}
        </div>

      </div>
    );
  }

  onMouseOver(event) {
    console.log('Mouse Over');
    this.setState({dropdownContainerVisibility: false});
  }

  onMouseOut(event) {
    console.log('Mouse Out');
    this.setState({dropdownContainerVisibility: true});
  }

};
// <div className="hover-check"></div>
