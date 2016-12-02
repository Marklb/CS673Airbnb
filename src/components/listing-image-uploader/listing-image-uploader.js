import React from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';
import ReactDom from 'react-dom';

require('./listing-image-uploader.scss');

export default class ListingImageUploader extends React.Component {
  static contextTypes = {

  };

  static propTypes = {
    
  };

  static defaultProps = {

  };

  constructor(props) {
    super(props);

    this.state = {
      imagesList: []
    };

    this.onChangeImageUpload = this.onChangeImageUpload.bind(this);
    this.onClickRemoveImage = this.onClickRemoveImage.bind(this);
  }

  componentDidMount() {

  }


  renderImportedImagesContainerContent() {

    if(this.state.imagesList.length > 0){
      return (
        <div>
          {this.state.imagesList.map((val, i) => {
            // let imgAttrs = {ind: i, val: val};
            return (
              <div key={i} className="img-container">
                <img src={val} className="img-size" />
                <div className="remove-btn"
                  data-index={i}
                  onClick={this.onClickRemoveImage}>Remove</div>
              </div>
            );
          })}
        </div>
      );
    }else{
      return (
        <div className="img-container">
          <div className="img-size no-img-placeholder">No Pictures</div>
        </div>
      );
    }

  }

  render() {
    return (
      <div className="listing-image-uploader">

        <div className="top-menu">
          <input type="file" multiple="multiple" className="upload-photo-btn" 
                onChange={this.onChangeImageUpload}/>
          <div className="title">Add pictures to your listing</div>
        </div>

        <div className="imported-images-container">
          {this.renderImportedImagesContainerContent()}
        </div>

      </div>
    );
  }

  onChangeImageUpload(e) {
    e.preventDefault();

    for(let i = 0; i < e.target.files.length; i++){
      let file = e.target.files[i];
      // console.log(file);

      let reader = new FileReader();
      reader.onloadend = (evt) => {
        // if(file.size > 1000000) {
        //   console.log('File size to large.');
        //   return;
        // }
        if(file.type != 'image/png' && file.type != 'image/gif' 
          && file.type != 'image/jpeg'){
          console.log('File not correct type.');
          return;
        }
        
        let imgData = evt.target.result;

        let newState = this.state;
        newState.imagesList.push(imgData);
        this.setState(newState);
        
        if(this.props.onImageListChange){
          this.props.onImageListChange(this.state.imagesList);
        }
      }
      reader.readAsDataURL(file);
    }

  }

  onClickRemoveImage(e) {
    e.preventDefault();

    console.log('Remove');

    let imgs = this.state.imagesList;
    imgs.splice(e.target.dataset.index, 1);
    // imgs = imgs.filter(function(val, i){
    //   console.log(val);
    //   console.log(e.target.src);
    //   console.log(e.target.dataset);
    //   return val !== e.target.src;
    // });
    this.setState({imagesList: imgs});

  }

};