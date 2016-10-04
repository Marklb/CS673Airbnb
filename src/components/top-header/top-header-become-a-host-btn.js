import React from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';

export default class TopHeaderBecomeAHostBtn extends React.Component {

  constructor(props) {
    super(props);

    // this.props.dropdownContainer = {
    //   className: 'dropdown-container',
    //   classNameVisible: 'dropdown-container visible'
    // };

    this.state = {
      dropdownContainerVisibility: true
    };
  }

  render() {
    let dropdownContainerClassName = this.state.dropdownContainerVisibility ?
      'dropdown-container' : 'dropdown-container visible';

    return (
      <Link to="#" className="right-btn become-a-host"
        onMouseOver={this.onMouseOver.bind(this)}
        onMouseOut={this.onMouseOut.bind(this)}
      >
        <div className="btn-rect">Become a Host</div>
        <div className={dropdownContainerClassName}>
          <div>You could earn $324 sharing your home in Newark in a week. Become a host.</div>
        </div>

      </Link>
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
