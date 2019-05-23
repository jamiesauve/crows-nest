import React from 'react';
import WeatherConditions from '../CurrentConditions/WeatherConditions';

import './Alert.scss';


const Alert = (props) => {
	const {
		dangerLevel,
		openAlertModal,
		time,
		weatherConditions,
	} = props;

	// TODO build logic for danger level out

	return (
		<div 
			className = {`alert alert__${dangerLevel}-danger`}
			onClick={openAlertModal}
		>
			<WeatherConditions
				isLargeSize
				weatherConditions={weatherConditions}
			/>

			<div className = "alert__time">
				{time}
			</div>
		</div>
	)
};

export default Alert;