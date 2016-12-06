import React from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';
import _ from 'lodash';
// Javascript Modules
import $ from 'jquery';
import UserSessionHandler from '../../user-session-handler';

// React Components
import DashboardContainer from '../dashboard-container';

require("./transaction-history.scss");

/*

*/
export default class TransactionHistory extends React.Component {
  static contextTypes = {
    userSessionHandler: React.PropTypes.instanceOf(UserSessionHandler).isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
		user_id: -1,
    incomeLook: [
      {income:'default'}
    ],
    expenseLook: [
      {expense:'default'}
    ],
		transactionResult: [
			{
				room_name: 'default',
				host_name: 'default',
				client_name: 'default',
				payment_type_name: 'default',
				booked_date_start: 'default',
				booked_date_end: 'default',
				amt_paid: 'default',
				paid_date: 'default'
			}
		],
    transactionResult2: [
			{
				room_name: 'default',
				host_name: 'default',
				client_name: 'default',
				payment_type_name: 'default',
				booked_date_start: 'default',
				booked_date_end: 'default',
				amt_paid: 'default',
				paid_date: 'default'
			}
		]
    };

  }

  componentDidMount() {
  $.get('/api/getUserInfo', {
    authType: this.context.userSessionHandler.getAuthType(),
    authToken: this.context.userSessionHandler.getAuthToken()
  }, (data, status) => {
    console.log("data:" + data);
    console.log("user_id:" + data.user_id);
    this.setState({user_id : data.user_id});
    console.log(this.state.user_id);
    $.post('/api/get_user_reservations', {
      'user_id' : this.state.user_id,

      //'room_name' : this.state.transactionResult.room_name,

    }, (data, status) => {
      if(data.query_success === false) {
        console.log('Transactions details query not successful');
      } else {
        console.log('Transactions details query successful');
        this.setState({transactionResult: data.result});
      }
    });
    $.post('/api/get_user_reservations2', {
      'user_id' : this.state.user_id,

      //'room_name' : this.state.transactionResult.room_name,

    }, (data, status) => {
      if(data.query_success === false) {
        console.log('Transactions details query not successful');
      } else {
        console.log('Transactions details query successful');
        this.setState({transactionResult2: data.result});
      }
    });
    $.post('/api/get_user_income', {
      'user_id' : this.state.user_id,

      //'room_name' : this.state.transactionResult.room_name,

    }, (data, status) => {
      if(data.query_success === false) {
        console.log('Transactions details query not successful');
      } else {
        console.log('Transactions details query successful');
        this.setState({incomeLook: data.result});
      }
    });

    $.post('/api/get_user_expense', {
      'user_id' : this.state.user_id,

      //'room_name' : this.state.transactionResult.room_name,

    }, (data, status) => {
      if(data.query_success === false) {
        console.log('Transactions details query not successful');
      } else {
        console.log('Transactions details query successful');
        this.setState({expenseLook: data.result});
      }
    });

  });
  }

  render() {
    return (
      <DashboardContainer headerTab='your-transactions' >
        <div className="transaction-panels">

          <div className="Transaction-group">
            <div className="Transaction-group-title">Your Transactions</div>
              <div className="Transaction-group-title">As a Host</div>
                <div className="Transaction-subgroup">
                  <div className="Transaction-subgroup-title">
                  {this.showHostTransactions()}
                  </div>
                </div>
                <div className="Transaction-group-title">As a Client</div>
                  <div className="Transaction-subgroup">
                    <div className="Transaction-subgroup-title">
                    {this.showClientTransactions()}
                    </div>
                  </div>
                  <div className="Transaction-group-title">Income</div>
                    <div className="Transaction-subgroup">
                      <div className="Transaction-subgroup-title">
                      {this.showIncome()}
                      </div>
                    </div>
                    <div className="Transaction-group-title">Expense</div>
                      <div className="Transaction-subgroup">
                        <div className="Transaction-subgroup-title">
                        {this.showExpense()}
                        </div>
                      </div>
          </div>
        </div>
      </DashboardContainer>
    );
  }

  /*

  Event Callbacks

  */

  showHostTransactions() {
    console.dir(this.state.transactionResult);
		if (this.state.transactionResult.length > 0) {
			//var today = new Date();
			return (
				<div>
				{this.state.transactionResult.map((val, i) => {
					//var days_remaining = new Date(date_req.getTime() + resp_time.getTime() - today.getTime());
					console.log(val.room_name);
					//console.log(days_remaining);
					return (
					<div key={i} className="f">
						Place: {val.room_name} Host: {val.host_name} Client: {val.client_name} Payment: {val.payment_type_name} Amount: ${val.amt_paid} Paid Date: {val.paid_date}
					</div>
					);
				})}
				</div>
			);
		} else {
			return (
				<div>
					You have no Transaction right now.
				</div>
			);
		}
	}

  showClientTransactions() {
    console.dir(this.state.transactionResult2);
		if (this.state.transactionResult2.length > 0) {
			//var today = new Date();
			return (
				<div>
				{this.state.transactionResult2.map((val, i) => {
					//var days_remaining = new Date(date_req.getTime() + resp_time.getTime() - today.getTime());

					//console.log(days_remaining);
					return (
					<div key={i} className="f">
						Place: {val.room_name} Host: {val.host_name} Client: {val.client_name} Payment: {val.payment_type_name} Amount: ${val.amt_paid} Paid Date: {val.paid_date}
					</div>
					);
				})}
				</div>
			);
		} else {
			return (
				<div>
					You have no Transaction right now.
				</div>
			);
		}
	}

  showIncome() {

			return (
				<div>
        {this.state.incomeLook.map((val, i) => {
					//var days_remaining = new Date(date_req.getTime() + resp_time.getTime() - today.getTime());
					//console.log(days_remaining);
					return (
					<div key={i} className="f">
						Income: {val.income}
					</div>
					);
				})}
				</div>
			);

	}

  showExpense() {

			return (
				<div>
        {this.state.expenseLook.map((val, i) => {
					//var days_remaining = new Date(date_req.getTime() + resp_time.getTime() - today.getTime());

					//console.log(days_remaining);
					return (
					<div key={i} className="f">
						Expense: {val.expense}
					</div>
					);
				})}
				</div>
			);

	}


};
