import React from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';
import ReactDom from 'react-dom';

require('./google-maps-location-selector.scss');

export default class GoogleMapsLocationSelector extends React.Component {
  static contextTypes = {

  };

  static propTypes = {
    onCoordinatesChanged: React.PropTypes.func
  };

  static defaultProps = {
    onCoordinatesChanged: null
  };

  constructor(props) {
    super(props);

    this.state = {

    };

  }

  componentDidMount() {
    if (navigator && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        const coords = pos.coords;
        
        this.map = new google.maps.Map(this.refs.map, {
          zoom: 8,
          center: {lat: coords.latitude, lng: coords.longitude}
        });
        
        this.marker = new google.maps.Marker({
          position: {lat: coords.latitude, lng: coords.longitude},
          map: this.map
        });
        
        this.map.addListener('center_changed', () => {
          const center = this.map.getCenter();
          this.marker.setPosition(center);
          if(this.props.onCoordinatesChanged){
            this.props.onCoordinatesChanged({
              lat: center.lat(), 
              lng: center.lng()
            });
          }
        });

        if(this.props.onCoordinatesChanged){
          this.props.onCoordinatesChanged({
              lat: coords.latitude, 
              lng: coords.longitude
            });
        }

      });
    }

  }

  render() {
    return (
      <div className="google-maps-location-selector">
        <div className="map" ref='map'></div>
      </div>
    );
  }

};