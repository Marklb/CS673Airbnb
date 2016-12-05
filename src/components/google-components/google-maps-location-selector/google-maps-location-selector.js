import React from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';
import ReactDom from 'react-dom';

let mblibDomUtils = require('../../../mblibs/mblib-dom-utils');

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
          center: {lat: coords.latitude, lng: coords.longitude},
          fullscreenControl: true,
          mapTypeControl: false
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

        

        var input = document.createElement('input');
        var input = this.refs.pacInput;
        this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

        // input.style.width = '100%';
        // input.marginRight = '30px';

        var searchBox = new google.maps.places.SearchBox((input));

        // input.addEventListener('click', (e) => {
        //   // console.log(e);
        //   if(e.button === 0){
        //     input.focus();
        //   }
        // });

        // input.addEventListener('mouseover', (e) => {
        //   // this.map.setOptions({draggable: false});
        // });

        // input.addEventListener('mouseout', (e) => {
        //   // this.map.setOptions({draggable: true});
        //   // input.blur();
        // });


        //--------------------------------------------------------
        let markers = [];
        // Listen for the event fired when the user selects a prediction and retrieve
        // more details for that place.
        searchBox.addListener('places_changed', function() {
          var places = searchBox.getPlaces();

          if (places.length == 0) {
            return;
          }

          // Clear out the old markers.
          markers.forEach(function(marker) {
            marker.setMap(null);
          });
          markers = [];

          // For each place, get the icon, name and location.
          var bounds = new google.maps.LatLngBounds();
          places.forEach(function(place) {
            if (!place.geometry) {
              console.log("Returned place contains no geometry");
              return;
            }
            var icon = {
              url: place.icon,
              size: new google.maps.Size(71, 71),
              origin: new google.maps.Point(0, 0),
              anchor: new google.maps.Point(17, 34),
              scaledSize: new google.maps.Size(25, 25)
            };

            // Create a marker for each place.
            markers.push(new google.maps.Marker({
              map: this.map,
              icon: icon,
              title: place.name,
              position: place.geometry.location
            }));

            if (place.geometry.viewport) {
              // Only geocodes have viewport.
              bounds.union(place.geometry.viewport);
            } else {
              bounds.extend(place.geometry.location);
            }
          });
          this.map.fitBounds(bounds);
        });

        // Bias the SearchBox results towards places that are within the bounds of the
        // current map's viewport.
        google.maps.event.addListener(this.map, 'bounds_changed', () => {
          var bounds = this.map.getBounds();
          searchBox.setBounds(bounds);
        });
        //--------------------------------------------------------



        // // Create a div to hold the control.
        // var controlDiv = document.createElement('div');

        // // Set CSS for the control border
        // var controlUI = document.createElement('div');
        // controlUI.style.backgroundColor = '#fff';
        // controlUI.style.border = '2px solid #fff';
        // controlUI.style.cursor = 'pointer';
        // controlUI.style.marginBottom = '22px';
        // controlUI.style.textAlign = 'center';
        // controlUI.title = 'Click to recenter the map';
        // controlDiv.appendChild(controlUI);

        // // Set CSS for the control interior
        // var controlText = document.createElement('div');
        // // controlText.style.color = 'rgb(25,25,25)';
        // // controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
        // // controlText.style.fontSize = '16px';
        // // controlText.style.lineHeight = '38px';
        // // controlText.style.paddingLeft = '5px';
        // // controlText.style.paddingRight = '5px';
        // controlText.style.width = '25px';
        // controlText.style.height = '50px';
        // // controlText.style.background = 'url(\'/images/expand.svg\')';
        // // controlText.innerHTML = 'Center Map';
        // controlUI.appendChild(controlText);
        // // controlUI.appendChild(expandBtn);
        // this.map.controls[google.maps.ControlPosition.LEFT_CENTER].push(controlDiv);

        // Setting tolerance to 0 is a hack for now to disable resize control
        // on that size since disabling them isn't implemented yet
        mblibDomUtils.makeElementResizable(this.refs.map, {
          tolerance_top: 0,
          tolerance_right: 0,
        });
        // This on call makes a VERY basic event type callback 
        mblibDomUtils.events.on(this.refs.map, 'resize', () => {
          var currCenter = this.map.getCenter();
          google.maps.event.trigger(this.map, 'resize');
          this.map.setCenter(currCenter);
        });

      });
    }

  }

  render() {
    return (
      <div>
        <div className="google-maps-location-selector">
          <div className="map" ref='map'></div>
        </div>
        <input id="pac-input" className="controls" type="text" ref='pacInput' placeholder="Search Box" />
      </div>
    );
  }

};