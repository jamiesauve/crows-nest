import React from 'react';

import getWeatherIconComponent from '../../Utils/getWeatherIconComponent';
import getDirectionSymbol from '../../Utils/getDirectionSymbol';

import './WeatherConditions.scss';

const WeatherConditions = (props) => {
	const Component = getWeatherIconComponent(props.weatherConditions);
	const DirectionSymbol = getDirectionSymbol(props.direction);

	return (
		<div className = "weather-conditions">
			<Component 
				size={48}
				color="#fff"
				/>

			<DirectionSymbol />

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