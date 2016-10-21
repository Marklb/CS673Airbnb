import React from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';

// Javascript Modules
import _ from 'lodash';

// React Components
import ModalsHandler from '../../modals-handler';

require("./modal.scss");

export default class Modal extends React.Component {
  static contextTypes = {
    modalsHandler: React.PropTypes.instanceOf(ModalsHandler).isRequired
  };

  constructor(props) {
    super(props);


    this.state = {
      isVisible: false
    };
  }

  renderContent() {
    return;
  }

  render() {
    const childrenWithProps = React.Children.map(this.props.children,
     (child) => React.cloneElement(child,
       {
         modalVars: {
           containerName: this.props.containerName,
           name: this.props.name
         }
       })
    );

    return (
      <div className="modal visible" onClick={this.onOuterClicked.bind(this)}>
        {childrenWithProps}
      </div>
    );
  }

  /*

  Event Callbacks

  */

  /*

  */
  onOuterClicked(event){
    event.stopPropagation();
    this.context.modalsHandler.hideModal(this.props.containerName, this.props.name);
  }


};
