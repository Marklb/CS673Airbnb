import React from 'react';
import { Link } from "react-router";
require("./filter-form.scss");
export default class FilterForm extends React.Component {
	showValue() {
		
	}

	render() {
		return (
			<div>
				<div className="date">
					<form className="f">
						Dates
						<input className="t1" type="date"></input>
						<input className="t" type="date"></input>
						<input className="t" type="date"></input>
					</form>
					
					<form className="f">
						Room type
						<input className="t2" type="checkbox"></input> Entire home
						<input className="t3" type="checkbox"></input> Private room
						<input className="t3" type="checkbox"></input> Shared room
					</form>
					
					<form className="f">
						Price range
						<input className="slide" type="range" min="0" max="100"></input>
					</form>
				</div>
			</div>

		);
	}
}