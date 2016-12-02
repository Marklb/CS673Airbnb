import React from 'react';
import { Link } from "react-router";
require("./become-host-page-header.scss");
export default class MyResult extends React.Component {

	render() {
		return (
			<div>
				{this.props.name}
			</div>

		);
	}
}