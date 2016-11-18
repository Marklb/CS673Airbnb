import React from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';
import _ from 'lodash';
import $ from 'jquery';
require("./room-page.scss");
export default class RoomPage extends React.Component {

	constructor(props) {
		super(props);

		this.state = {

		};
	}

	render() {
		return (
			<div>Room display page</div>
		);
	}
}
