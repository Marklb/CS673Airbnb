import React from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';
import ReactDom from 'react-dom';

require('./google-maps-single-place.scss');

export default class GoogleMapsSinglePlace extends React.Component {
  static contextTypes = {

  };

  static propTypes = {
    placeCoords: React.PropTypes.object
  };

  static defaultProps = {
    placeCoords: null
  };

  constructor(props) {
    super(props);

    this.state = {

    };

  }

  componentDidMount() {
    if(this.props.placeCoords === null) return;

    this.map = new google.maps.Map(this.refs.map, {
      zoom: 8,
      center: this.props.placeCoords
    });
    
    this.marker = new google.maps.Marker({
      position: this.props.placeCoords,
      map: this.map
    });
  }

  render() {
    return (
      <div className="google-maps-single-place">
        <div className="map" ref='map'></div>
      </div>
    );
  }

};