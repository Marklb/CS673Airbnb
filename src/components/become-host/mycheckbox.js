import React from 'react';
import { Link } from "react-router";
require("./become-host-page-header.scss");
export default class MyCheckBox extends React.Component {

	render() {
		return (
			<div>
				<input className="t1" type="checkbox"></input> {this.props.street}
			</div>

		);
	}
}