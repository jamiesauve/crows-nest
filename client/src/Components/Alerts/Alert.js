import React from 'react';
import WeatherConditions from '../CurrentConditions/WeatherConditions';

import './Alert.scss';


const Alert = (props) => {
	const {
		dangerLevel,
		time,
		weatherConditions,
	} = props;

	// TODO build logic for danger level out

	return (
		<div className = {`alert alert__${dangerLevel}-danger`}>
			<WeatherConditions
				weatherConditions={weatherConditions}
				isLargeSize
			/>

			<div className = "alert__time">
				{time}
			</div>
		</div>
	)
};

export default Alert;