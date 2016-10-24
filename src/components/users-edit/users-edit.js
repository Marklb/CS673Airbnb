import _ from 'lodash';
import React from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';

import DashboardContainer from '../dashboard-container';

require("./users-edit.scss");

const tempUserId = 345897;

/*

*/
export default class UsersEdit extends React.Component {
  static activeNavOptClassName = 'active';

  static propTypes = {

  };

  static defaultProps = {

  };

  constructor(props) {
    super(props);

    this.state = {
      activeSideNavOptName: 'edit_profile'
    };

    this.panels = [
      {
        name: 'edit_profile',
        text: 'Edit Profile',
        renderFn: this.renderMainPanelEditProfile
      },
      {
        name: 'photo_symbols_video',
        text: 'Photos, Symbols, and Video',
        renderFn: this.renderMainPanelPhotosSymbolsAndVideo
      },
      {
        name: 'trust_verification',
        text: 'Trust and Verification',
        renderFn: this.renderMainPanelTrustAndVerification
      },
      {
        name: 'reviews',
        text: 'Reviews',
        renderFn: this.renderMainPanelReviews
      },
      {
        name: 'references',
        text: 'References',
        renderFn: this.renderMainPanelReferences
      }
    ];
  }

  componentDidMount() {

  }

  renderLeftPanel() {
    return (
      <div className='dashboard-left-panel'>
        <div className='sidenav'>
          <ul className='sidenav-list'>
            {this.panels.map((panel, index) => {
              return (
                <li key={index}
                  className={'nav-item' + ((this.state.activeSideNavOptName==panel.name)?
                    ` ${UsersEdit.activeNavOptClassName}`: '')}
                  onClick={(e) => this.setActiveTab(panel.name)}>
                  {panel.text}
                </li>
              );
            })}
          </ul>
        </div>

        <Link to={`/users/show/${tempUserId}`} className="left-panel-btn">View Profile</Link>
      </div>
    );
  }

  renderMainPanelEditProfile() {
    return (
      <div>

        <div className="dashboard-panel">
          <div className="dashboard-panel-header">Required</div>
          <div className="dashboard-panel-body">
            <div className="dashboard-panel-form">

              <div className="form-row">
                <div className="row-label">First Name</div>
                <div className="row-content"><input type="text"></input></div>
              </div>

              <div className="form-row">
                <div className="row-label">Last Name</div>
                <div className="row-content">
                  <input type="text"></input>
                  <div className="row-content-text">This is only shared once you have a confirmed booking with another Airbnb user.</div>
                </div>
              </div>

              <div className="form-row">
                <div className="row-label">I am</div>
                <div className="row-content">
                  <div className="row">
                    <select>
                      <option value="gender">Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="row-content-text">This is only shared once you have a confirmed booking with another Airbnb user.</div>
                </div>
              </div>

              <div className="form-row">
                <div className="row-label">Birth Date</div>
                <div className="row-content">

                </div>
              </div>

              <div className="form-row">
                <div className="row-label">Email Address</div>
                <div className="row-content">

                </div>
              </div>

              <div className="form-row">
                <div className="row-label">Phone Number</div>
                <div className="row-content">

                </div>
              </div>

              <div className="form-row">
                <div className="row-label">Preferred Language</div>
                <div className="row-content">

                </div>
              </div>

              <div className="form-row">
                <div className="row-label">Preffered Currency</div>
                <div className="row-content">

                </div>
              </div>

              <div className="form-row">
                <div className="row-label">Where You Live</div>
                <div className="row-content">

                </div>
              </div>

              <div className="form-row">
                <div className="row-label">Describe Yourself</div>
                <div className="row-content">

                </div>
              </div>

            </div>
          </div>
        </div>

        <div className="dashboard-panel">
          <div className="dashboard-panel-header">Optional</div>
          <div className="dashboard-panel-body">

            <div className="dashboard-panel-form">

              <div className="form-row">
                <div className="row-label">School</div>
                <div className="row-content">

                </div>
              </div>

              <div className="form-row">
                <div className="row-label">Work</div>
                <div className="row-content">

                </div>
              </div>

              <div className="form-row">
                <div className="row-label">Time Zone</div>
                <div className="row-content">

                </div>
              </div>

              <div className="form-row">
                <div className="row-label">Languages</div>
                <div className="row-content">

                </div>
              </div>

              <div className="form-row">
                <div className="row-label">Emergency contact</div>
                <div className="row-content">

                </div>
              </div>

              <div className="form-row">
                <div className="row-label">Shipping Address</div>
                <div className="row-content">

                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    );
  }

  renderMainPanelPhotosSymbolsAndVideo() {
    return (
      <div>

        <div className="dashboard-panel">
          <div className="dashboard-panel-header">Profile Photo</div>
          <div className="dashboard-panel-body">


          </div>
        </div>

      </div>
    );
  }

  renderMainPanelTrustAndVerification() {
    return (
      <div>

        <div className="dashboard-panel">
          <div className="dashboard-panel-body">


          </div>
        </div>

        <div className="dashboard-panel">
          <div className="dashboard-panel-header">Your verified info</div>
          <div className="dashboard-panel-body">


          </div>
        </div>

        <div className="dashboard-panel">
          <div className="dashboard-panel-header">Not yet verified</div>
          <div className="dashboard-panel-body">


          </div>
        </div>

      </div>
    );
  }

  renderMainPanelReviews() {
    return (
      <div>
        {/* Add tabs */}

        {/* Tab 1 */}
        <div className="dashboard-panel">
          <div className="dashboard-panel-header">Past Reviews</div>
          <div className="dashboard-panel-body">


          </div>
        </div>

        {/* Tab 2 */}
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

  renderMainPanelReferences() {
    return (
      <div>
        {/* Add tabs */}

        {/* Tab 1 */}
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

        {/* Tab 2 */}
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

        {/* Tab 3 */}
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

  renderMainPanel() {
    return (
      <div className='dashboard-main-panel'>
        {_.find(this.panels, (panel) => {
          return (this.state.activeSideNavOptName==panel.name)}).renderFn()}
      </div>
    );
  }

  render() {
    return (
      <DashboardContainer headerTab='profile' >
        <div className='dashboard-content-flex'>
          {this.renderLeftPanel()}
          {this.renderMainPanel()}
        </div>
      </DashboardContainer>
    );
  }

  setActiveTab(panelName) {
    this.setState({activeSideNavOptName: panelName});
  }

  /*

  Event Callbacks

  */




};
