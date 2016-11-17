import _ from 'lodash';
import React from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';

import DashboardContainer from '../../dashboard-container';

require("../users-edit.scss");


/*

*/
export default class Reviews extends React.Component {
  static propTypes = {

  };

  static defaultProps = {

  };

  constructor(props) {
    super(props);

    this.state = {
      activeTab: 'reviews_about_you'
    };

  }

  componentDidMount() {

  }

  renderTabReviewsAboutYou() {
    return (
      <div>
        <div className="dashboard-panel">
          <div className="dashboard-panel-header">Past Reviews</div>
          <div className="dashboard-panel-body">


          </div>
        </div>
      </div>
    );
  }

  renderTabReviewsByYou() {
    return (
      <div>
        <div className="dashboard-panel">
          <div className="dashboard-panel-header">Reviews to Write</div>
          <div className="dashboard-panel-body">


          </div>
        </div>

        <div className="dashboard-panel">
          <div className="dashboard-panel-header">Past Reviews You've Written</div>
          <div className="dashboard-panel-body">


          </div>
        </div>
      </div>
    );
  }

  render() {
    let tabRenderFn = null;
    switch(this.state.activeTab){
      case 'reviews_about_you':
        tabRenderFn = this.renderTabReviewsAboutYou;
        break;
      case 'reviews_by_you':
        tabRenderFn = this.renderTabReviewsByYou;
        break;
    };

    return (
      <div>

        <div className="dashboard-panel-tabs-bar">
          <div className={'dashboard-panel-tabs-bar-tab' +
              ((this.state.activeTab == 'reviews_about_you')?
              ` selected` : '')}
            onClick={(e) => this.setActiveTab('reviews_about_you')}
            >Reviews About You</div>
          <div className={'dashboard-panel-tabs-bar-tab' +
              ((this.state.activeTab == 'reviews_by_you')?
              ` selected` : '')}
            onClick={(e) => this.setActiveTab('reviews_by_you')}
            >Reviews By You</div>
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
