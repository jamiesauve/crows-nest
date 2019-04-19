import React from 'react';

import getWeatherIconComponent from '../../Utils/getWeatherIconComponent';

import './WeatherConditions.scss';

const WeatherConditions = (props) => {
	const Component = getWeatherIconComponent(props.weatherConditions);

	return (
		<div className = "weather-conditions">
			<Component 
				size={48}
				color="#fff"
				/>

			<div className = "weather-conditions__direction-symbol__falling">
				&#9660;
			</div>

			{/* 
			// in a tooltip
			<div className = "weather-conditions__label">
				{props.weatherConditions}
			</div>	 */}

			{/* &#9650; */}
			{/* &#9679; */}
		</div>
	);
};

export default WeatherConditions;