import React from 'react';
import { Link } from "react-router";
require("./filter-form.scss");
export default class MyResult extends React.Component {

	render() {
		return (
			<div>
				{this.props.name}
			</div>

		);
	}
}