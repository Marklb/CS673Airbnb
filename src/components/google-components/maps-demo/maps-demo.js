import React from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';
import ReactDom from 'react-dom';


import GoogleMapsLocationSelector from '../google-maps-location-selector';
import GoogleMapsSearchPlaces from '../google-maps-search-places';
import GoogleMapsSinglePlace from '../google-maps-single-place';


require('./maps-demo.scss');

export default class MapsDemo extends React.Component {
  static contextTypes = {

  };

  static propTypes = {

  };

  static defaultProps = {

  };

  constructor(props) {
    super(props);

    this.state = {
      locationSelectorLat: null,
      locationSelectorLng: null,

      placeMarkersData: [
        {lat: 40.75193, lng: -74.18561, price: 234.74},
        {lat: 40.65303, lng: -74.17600, price: 540.63},
        {lat: 40.65785, lng: -74.16621, price: 105.62},
        {lat: 40.66631, lng: -74.17085, price: 92.89},
        {lat: 40.66904, lng: -74.18458, price: 120.35},
        {lat: 40.67634, lng: -74.19711, price: 20.64},
        {lat: 40.67516, lng: -74.21239, price: 361.76},
        {lat: 40.66501, lng: -74.22561, price: 587.23},
        {lat: 40.65589, lng: -74.23642, price: 250.43}
      ],

      displayPlaceCoords: {
        lat: 40.75199,
        lng: -74.18561
      }
    };

  }

  componentDidMount() {

  }


  renderLocationSelectorExample() {
    let lat = this.state.locationSelectorLat;
    let lng = this.state.locationSelectorLng;
    if(lat && lng){
      lat = lat.toFixed(5); // Just lowering the presision for the example lable
      lng = lng.toFixed(5); 
    }

    return (
      <div className="google-maps-location-selector-example">
        <div className="header">
          <div>Location Selector Example</div>
          <div>Lat: {lat}, lng: {lng}</div>
        </div>
        <div className="body">
          <GoogleMapsLocationSelector className="selector-map" 
            onCoordinatesChanged={this.onLocationSelectorMapCoordsChange.bind(this)} />
        </div>
      </div>
    );
  }

  onLocationSelectorMapCoordsChange(latlng) {
    this.setState({
      locationSelectorLat: latlng.lat,
      locationSelectorLng: latlng.lng
    });
  }





  renderSearchPlacesExample() {
    if(this.state.placeMarkersData.length > 0){
      return (
        <div className="google-maps-search-places-example">
          <div className="header">
            <div>Search Places Example</div>
            <div>(For search results locations with price)</div>
          </div>
          <div className="body">
            <GoogleMapsSearchPlaces className="search-map" 
              placeMarkersData={this.state.placeMarkersData} />
          </div>
        </div>
      );
    }
  }





  renderSinglePlaceExample() {
    if(this.state.displayPlaceCoords !== null){
      return (
        <div className="google-maps-single-place-example">
          <div className="header">
            <div>Single Places Example</div>
            <div>(For a spot like the display place page)</div>
          </div>
          <div className="body">
            <GoogleMapsSinglePlace className="single-place-map" 
              placeCoords={this.state.displayPlaceCoords} />
          </div>
        </div>
      );
    }
  }



  render() {
    return (
      <div className="maps-demo">
        {this.renderLocationSelectorExample()}
        {this.renderSearchPlacesExample()}
        {this.renderSinglePlaceExample()}
      </div>
    );
  }

};