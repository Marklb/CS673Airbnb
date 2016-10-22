import _ from 'lodash';
import React from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';

// React Components
import ModalsHandler from '../../modals-handler';
import UserSessionHandler from '../../user-session-handler';

require("./modals-container.scss");

export default class ModalsContainer extends React.Component {
  static contextTypes = {
    userSessionHandler: React.PropTypes.instanceOf(UserSessionHandler).isRequired,
    modalsHandler: React.PropTypes.instanceOf(ModalsHandler).isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      visibleModalNames: []
    };
  }

  componentDidMount() {
    this.context.modalsHandler.registerModalContainer(this.props.name, this);
  }



  render() {


    const childrenWithProps1 = React.Children.map(this.props.children,
     (child) => React.cloneElement(child, {containerName: this.props.name})
    );

    const childrenWithProps = [];
    _.forEach(childrenWithProps1, (child) => {
      let isVisible = this.context.modalsHandler.isModalVisible(this.props.name, child.props.name);
      if(isVisible === true){
        childrenWithProps.push(child);
      }
    });

    return (
      <div className={(childrenWithProps.length > 0) ? "modals-container visible" : "modals-container"}>
        {childrenWithProps}
      </div>
    );
  }

  /*

  Event Callbacks

  */
  onModalContainerClicked(event){
    this.props.hideAllModals();
  }


};
