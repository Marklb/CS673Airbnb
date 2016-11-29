import React from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';

import _ from 'lodash';
import $ from 'jquery';
import UserSessionHandler from '../../../user-session-handler';
import ModalsHandler from '../../../modals-handler';

import DashboardContainer from '../../dashboard-container';

require("../users-edit.scss");


/*

*/
export default class PhotosAndVideo extends React.Component {
  static contextTypes = {
    userSessionHandler: React.PropTypes.instanceOf(UserSessionHandler).isRequired,
    modalsHandler: React.PropTypes.instanceOf(ModalsHandler).isRequired
  };

  static propTypes = {

  };

  static defaultProps = {

  };

  constructor(props) {
    super(props);

    this.state = {
      profilePhotoFile: '',
      profilePhotoPreviewUrl: '/images/user_pic-225x225.png'
    };

    this.onChangeImageUpload = this.onChangeImageUpload.bind(this);
  }

  componentDidMount() {

  }

  render() {
    return (
      <div>

        <div className="dashboard-panel profile-photo-panel">
          <div className="dashboard-panel-header">Profile Photo</div>
          <div className="dashboard-panel-body">
            <div className="profile-photo-body">
              <div className="profile-photo-container">
                <img className="profile-photo" 
                     src={this.state.profilePhotoPreviewUrl} />
              </div>
              <div className="profile-photo-btns-container">
                <input type="file" className="upload-photo-btn" 
                      onChange={this.onChangeImageUpload}/>
              </div>

            </div>
          </div>
        </div>

      </div>
    );
  }


  /*

  Event Callbacks

  */
  onChangeImageUpload(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = (evt) => {
      if(file.size > 10000) {
        console.log('File size to large.');
        return;
      }
      if(file.type != 'image/png' && file.type != 'image/gif' 
        && file.type != 'image/jpeg'){
        console.log('File not correct type.');
        return;
      }
      
      let postData = this.context.userSessionHandler.getSessionAuthValues();
      postData.imgData = evt.target.result;
      $.post('/api/upload_user_profile_image', postData, (data, status) => {
        if(data.success === false) {
          console.log('Profile Image Upload Not Successful');
        } else {
          console.log('Profile Image Upload Successful');
          this.setState({
            profilePhotoFile: file,
            profilePhotoPreviewUrl: reader.result
          });
        }
      });

      
    }

    reader.readAsDataURL(file)
  }



};
