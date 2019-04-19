import React, { Component, } from 'react';

import Alert from '../Components/Alerts/Alert';

import './Alerts.scss';

class Alerts extends Component {
	render() {
		return (
			<div className="alerts">
				<Alert />
			</div>
		)
	};
};

export default Alerts;