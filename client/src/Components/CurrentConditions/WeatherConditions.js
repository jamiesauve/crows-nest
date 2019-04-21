import React from 'react';

import getWeatherIconComponent from '../../Utils/getWeatherIconComponent';
import getDirectionSymbol from '../../Utils/getDirectionSymbol';

import './WeatherConditions.scss';

const WeatherConditions = (props) => {
	const weatherIcon = getWeatherIconComponent(props.weatherConditions);
	const WeatherIconComponent = weatherIcon.icon;
	const weatherIconColor = weatherIcon.color;

	const DirectionSymbol = getDirectionSymbol(props.direction);

	return (
		<div className = "weather-conditions">
			<WeatherIconComponent 
				size={props.isLargeSize ? "36" : "24"}
				color={weatherIconColor}
			/>

			<DirectionSymbol 
				isLargeSize={props.isLargeSize}
			/>

			{/* 
			// TODO in a tooltip
			<div className = "weather-conditions__label">
				{props.weatherConditions}
			</div>	 */}
		</div>
	);
};

export default WeatherConditions;