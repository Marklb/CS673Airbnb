import _ from 'lodash';
import React from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';

import DashboardContainer from '../../dashboard-container';

require("../users-edit.scss");


/*

*/
export default class References extends React.Component {
  static propTypes = {

  };

  static defaultProps = {

  };

  constructor(props) {
    super(props);

    this.state = {
      activeTab: 'request_references'
    };

  }

  componentDidMount() {

  }

  renderTabRequestReferences() {
    return (
      <div>
        <div className="dashboard-panel">
          <div className="dashboard-panel-body">


          </div>
        </div>

        <div className="dashboard-panel">
          <div className="dashboard-panel-header">Email your friends</div>
          <div className="dashboard-panel-body">


          </div>
        </div>

        <div className="dashboard-panel">
          <div className="dashboard-panel-header">Airbnb Friends</div>
          <div className="dashboard-panel-body">


          </div>
        </div>
      </div>
    );
  }

  renderTabReferencesAboutYou() {
    return (
      <div>
        <div className="dashboard-panel">
          <div className="dashboard-panel-header">Pending Approval</div>
          <div className="dashboard-panel-body">


          </div>
        </div>

        <div className="dashboard-panel">
          <div className="dashboard-panel-header">Past References Written About You</div>
          <div className="dashboard-panel-body">


          </div>
        </div>
      </div>
    );
  }

  renderTabReferencesByYou() {
    return (
      <div>
        <div className="dashboard-panel">
          <div className="dashboard-panel-header">Reference Requests</div>
          <div className="dashboard-panel-body">


          </div>
        </div>

        <div className="dashboard-panel">
          <div className="dashboard-panel-header">Past References You've Written</div>
          <div className="dashboard-panel-body">


          </div>
        </div>
      </div>
    );
  }

  render() {
    let tabRenderFn = null;
    switch(this.state.activeTab){
      case 'request_references':
        tabRenderFn = this.renderTabRequestReferences;
        break;
      case 'references_about_you':
        tabRenderFn = this.renderTabReferencesAboutYou;
        break;
      case 'references_by_you':
        tabRenderFn = this.renderTabReferencesByYou;
        break;
    };

    return (
      <div>

        <div className="dashboard-panel-tabs-bar">
          <div className={'dashboard-panel-tabs-bar-tab' +
              ((this.state.activeTab == 'request_references')?
              ` selected` : '')}
            onClick={(e) => this.setActiveTab('request_references')}
            >Request References</div>
          <div className={'dashboard-panel-tabs-bar-tab' +
              ((this.state.activeTab == 'references_about_you')?
              ` selected` : '')}
            onClick={(e) => this.setActiveTab('references_about_you')}
            >References About You</div>
          <div className={'dashboard-panel-tabs-bar-tab' +
              ((this.state.activeTab == 'references_by_you')?
              ` selected` : '')}
            onClick={(e) => this.setActiveTab('references_by_you')}
            >References By You</div>
        </div>

        {(tabRenderFn) ? tabRenderFn() : null}


      </div>
    );
  }

  setActiveTab(tabName) {
    this.setState({activeTab: tabName});
  }


  /*

  Event Callbacks

  */




};
