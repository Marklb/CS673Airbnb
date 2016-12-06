import React from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';
import ReactDom from 'react-dom';

require('./google-maps-search-places.scss');

export default class GoogleMapsSearchPlaces extends React.Component {
  static contextTypes = {

  };

  static propTypes = {
    placeMarkersData: React.PropTypes.array
  };

  static defaultProps = {
    placeMarkersData: []
  };

  constructor(props) {
    super(props);

    this.state = {

    };

    this.markers = [];
  }

  componentDidMount() {
    console.log(this.props);
    if(this.props.placeMarkersData.length == 0) return;
    let list = [];
    for(let i = 0; i < this.props.placeMarkersData.length; i++){
      if(this.props.placeMarkersData[i].lat 
        || this.props.placeMarkersData[i].lng){
        list.push(this.props.placeMarkersData[i]);
      }
    }
    if(list.length <= 0) return;

    let latArr = list.map((val) => val.lat);
    let lngArr = list.map((val) => val.lng);
    let center = {
      lat: latArr.reduce((a, b) => a + b, 0)/latArr.length,
      lng: lngArr.reduce((a, b) => a + b, 0)/lngArr.length
    };
    console.log(center);

    this.map = new google.maps.Map(this.refs.map, {
      zoom: 8,
      center: center
    });

    for(let i = 0; i < this.markers.length; i++){
      this.markers[i].setMap(null);
    }
    this.markers = [];
    var image = {
      url: '/images/marker-red.png',
      // This marker is 20 pixels wide by 32 pixels high.
      // size: new google.maps.Size(32, 21),
      // The origin for this image is (0, 0).
      origin: new google.maps.Point(0, 0),
      // The anchor for this image is the base of the flagpole at (0, 32).
      // anchor: new google.maps.Point(0, 25)
      scaledSize: new google.maps.Size(45, 18)
    };
    for(let i = 0; i < list.length; i++){
      let marker = new google.maps.Marker({
        position: {
          lat: list[i].lat, 
          lng: list[i].lng
        },
        map: this.map,
        label: {
          color: 'rgba(230,230,230,1)',
          fontSize: '10px',
          text: `$${list[i].price}`
        },
        icon: image
      });
      this.markers.push(marker);
    }

    this.map.fitBounds({
      west: Math.min.apply(null, list.map((val) => val.lng)),
      north: Math.max.apply(null, list.map((val) => val.lat)),
      east: Math.max.apply(null, list.map((val) => val.lng)),
      south: Math.min.apply(null, list.map((val) => val.lat))
    });

  }

  render() {
    return (
      <div className="google-maps-search-places">
        <div className="map" ref='map'></div>
      </div>
    );
  }

};