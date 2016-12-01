import React from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';
import ReactDom from 'react-dom'; 

import _ from 'lodash';
import $ from 'jquery';

require("./room-page-google-map.scss");


/*

*/
export default class RoomPageGoogleMap extends React.Component {
  static contextTypes = {

  };

  static propTypes = {

  };

  static defaultProps = {

  };

  constructor(props) {
    super(props);

    this.state = {
      
    };

    this.geocoder = new google.maps.Geocoder();

    // this.onChangeImageUpload = this.onChangeImageUpload.bind(this);
  }

  componentDidMount() {
    // this.setState({mapElement: this.refs.map});
  }

  render() {
    let setMap = () => {
      window.requestAnimationFrame(() => {
        // if(!this.state.mapElement) return;
        console.log(this.props.place);
        console.log(this.geocoder);
        this.geocoder.geocode({'address': this.props.place}, (results, status) => {
          if (status === 'OK') {
            console.log(results[0].geometry.location);
            let lat = results[0].geometry.location.lat();
            let lng = results[0].geometry.location.lng();
            console.log(this.refs.map);
            // console.log(ReactDom.findDOMNode(this));
            // console.log(this.map);
            if(!this.map){
              console.log(`New map at: ${lat}, ${lng}`);
              this.map = new google.maps.Map(this.refs.map, {
                zoom: 8,
                center: {lat: -34.397, lng: 150.644} 
              });
            }

            // resultsMap.setCenter(results[0].geometry.location);
            // var marker = new google.maps.Marker({
            //   map: resultsMap,
            //   position: results[0].geometry.location
            // });
          } else {
            // alert('Geocode was not successful for the following reason: ' + status);
            console.log('Geocode was not successful for the following reason: ' + status);
          }
        });

      });
    };
    return (
      <div className="room-page-google-map">
        <div className="map" ref='map'></div>
        {setMap()}
      </div>
    );
  }


  /*

  Event Callbacks

  */




};
