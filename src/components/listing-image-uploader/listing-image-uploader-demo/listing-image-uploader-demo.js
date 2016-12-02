import React from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';
import ReactDom from 'react-dom';

import $ from 'jquery';
import UserSessionHandler from '../../../user-session-handler';

import ListingImageUploader from '../';

require('./listing-image-uploader-demo.scss');

export default class ListingImageUploaderDemo extends React.Component {
  static contextTypes = {
    userSessionHandler: React.PropTypes.instanceOf(UserSessionHandler).isRequired,
  };

  static propTypes = {

  };

  static defaultProps = {

  };

  constructor(props) {
    super(props);

    this.state = {
      imagesUploadedToBrowser: []
    };

  }

  componentDidMount() {

  }

  render() {
    return (
      <div className="listing-image-uploader-demo">

        <ListingImageUploader onImageListChange={this.onImageListChange.bind(this)}/>

        <button onClick={this.onClickUploadToServer.bind(this)}>Upload image list to server</button>
      </div>
    );
  }

  onImageListChange(imgList){
    this.setState({imagesUploadedToBrowser: imgList});
  }

  onClickUploadToServer(e) {
    // I do one request at a time, because the file data is to big.
    // console.log(this.state.imagesUploadedToBrowser);
    let promises = [];
    for(let i = 0; i < this.state.imagesUploadedToBrowser.length; i++){
      var p = new Promise((resolve, reject) => {
        let postData = this.context.userSessionHandler.getSessionAuthValues();
        postData.imgData = this.state.imagesUploadedToBrowser[0];
        postData.place_id = 1;  
        $.post('/api/upload_place_image', postData, (data, status) => {
          if(data.success === false) {
            console.log('Image Upload Not Successful');
            resolve('Image Upload Not Successful');
          } else {
            console.log('Image Upload Successful');
            resolve('Image Upload Successful');
          }
        });
      });
      promises.push(p);
    }

    Promise.all(promises).then(values => {
      console.log('Done Uploading'); 
      console.log(values); 
    });

  }

};