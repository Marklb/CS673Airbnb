import _ from 'lodash';
import React from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';

require("./modals-container.scss");

export default class ModalsContainer extends React.Component {
  constructor(props) {
    super(props);


    this.state = {

    };
  }



  render() {
    // console.log(this.props);
    // const childrenWithProps = React.Children.map(this.props.children,
    //  (child) => React.cloneElement(child, {
    //    props: this.props
    //   //  modalVars: this.props.modalVars
    //  })
    // );
    const childrenWithProps = React.Children.map(this.props.children,
     (child) => React.cloneElement(child, this.props)
    );

    let isVisible = false;
    _.forEach(this.props.modalVars.isVisible, (value, key) => {
      if(value === true) isVisible = true;
    });

    return (
      <div className={(isVisible) ? "modals-container visible" : "modals-container"}
        onClick={this.onModalContainerClicked.bind(this)}
      >
        {/*this.props.children*/}
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
