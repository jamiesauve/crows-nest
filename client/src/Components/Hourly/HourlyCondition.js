import React from 'react';

import Temperature from '../CurrentConditions/Temperature';
import WeatherConditions from '../CurrentConditions/WeatherConditions';

import './HourlyCondition.scss';

const HourlyCondition = (props) => {
	const {
		temperature,
		time,
		weatherConditions,
	} = props;

	return (
		<div className = "hourly-condition">
			<Temperature 
					temperature={temperature}
					direction={"rising"}
			/>
			
			<WeatherConditions
				weatherConditions={weatherConditions}
				direction={"falling"}
				unitSize={36}
			/>

			<div className = "hourly-condition__time">
				{time}
			</div>
		</div>
	)
};

export default HourlyCondition;