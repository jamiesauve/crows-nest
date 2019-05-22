import React from 'react';

import HourlyCondition from '../Components/Hourly/HourlyCondition';

import './Hourly.scss';

const Hourly = (props) => { 

	return (
		<div className = "hourly">
			{
				props.hourlyConditionsList.map((hourlyCondition, index) => {
				return (
					<HourlyCondition
						key = {`hourly${index}`}
						temperature={hourlyCondition.temperature}
						temperatureDirection={props.temperatureDirection}
						time={hourlyCondition.time}
						weatherConditions={hourlyCondition.weatherConditions}
					/>
				)
			}) }
		</div>
	)
};

export default Hourly;