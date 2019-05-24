import React, { Component, } from 'react';
import Moment from 'moment';

import Alert from '../Components/Alerts/Alert';

import getDangerLevel from '../Utils/getDangerLevel';

import './Alerts.scss';

class Alerts extends Component {
	constructor() {
		super();

		this.constructAlerts = this.constructAlerts.bind(this);
	}

	constructAlerts(
		rawAlerts,
		currentConditions,
		hourlyConditionsList,
		nearestStormDirection, 
		nearestStormDistance
	) {
		// will need a way to parse out duplicate weather conditions (floods)
		const alerts = rawAlerts.map((rawAlert, index) => {
			const dangerLevel = getDangerLevel(rawAlert.severity);

			const expiryTime = Moment(rawAlert.expires * 1000).format("h:MM a");

			const weatherCondition = (() => {
				// parse out conditions in order of urgency
				if (
					rawAlert.title.toUpperCase().includes("TORNADO") 
					|| rawAlert.description.toUpperCase().includes("TORNADO")
				) {
					return "tornado";
				} else if (
					rawAlert.title.toUpperCase().includes("FLOOD") 
					|| rawAlert.description.toUpperCase().includes("FLOOD")
				) {
					return "flood";
				} else if (
					rawAlert.title.toUpperCase().includes("THUNDERSTORM") 
					|| rawAlert.description.toUpperCase().includes("THUNDERSTORM")
				) {
					return "thunderstorm";
				} 
				
				return rawAlert.title;
			})();

			rawAlert.weatherCondition = weatherCondition;

			return (
				<Alert
					dangerLevel={dangerLevel}
					key={`alert${index}`}
					onClick = {() => {
						this.props.setCurrentAlert(rawAlert);
						this.props.openAlertModal();
					}}
					time={expiryTime}
					weatherConditions={weatherCondition}
				/>
			);
		});

		return alerts;
	}
	
	render() {
		const {
			alerts,
			currentConditions,
			hourlyConditionsList,
			nearestStormDirection,
			nearestStormDistance,
		} = this.props;
	
		const constructedAlerts = this.constructAlerts( // TODO make this and implement it below
			alerts,
			currentConditions,
			hourlyConditionsList,
			nearestStormDirection, 
			nearestStormDistance
		);
	
		// TODO map this, and if there are more than 4 alerts, attach them left and make them scrollable.
		return (
			<div className="alerts">
				{constructedAlerts}
			</div>
		);
	}
};

export default Alerts;