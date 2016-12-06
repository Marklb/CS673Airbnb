import _ from 'lodash';
import React from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';

import DashboardContainer from '../dashboard-container';
import EditProfile from './sections/edit-profile';
import PhotosAndVideo from './sections/photos-and-video';
import TrustAndVerifications from './sections/trust-and-verifications';
import Reviews from './sections/reviews';
import References from './sections/references';


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
        // text: 'Photos, Symbols, and Video',
        text: 'Photo',
        renderFn: this.renderMainPanelPhotosSymbolsAndVideo
      },
      // {
      //   name: 'trust_verification',
      //   text: 'Trust and Verification',
      //   renderFn: this.renderMainPanelTrustAndVerification
      // },
      // {
      //   name: 'reviews',
      //   text: 'Reviews',
      //   renderFn: this.renderMainPanelReviews
      // },
      // {
      //   name: 'references',
      //   text: 'References',
      //   renderFn: this.renderMainPanelReferences
      // }
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

        {/*<Link to={`/users/show/${tempUserId}`} className="left-panel-btn">View Profile</Link>*/}
      </div>
    );
  }

  renderMainPanelEditProfile() {
    return <EditProfile />
  }

  renderMainPanelPhotosSymbolsAndVideo() {
    return <PhotosAndVideo />
  }

  renderMainPanelTrustAndVerification() {
    return <TrustAndVerifications />
  }

  renderMainPanelReviews() {
    return <Reviews />
  }

  renderMainPanelReferences() {
    return <References />
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
