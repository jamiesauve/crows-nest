import React from 'react';
import { WiCloud } from 'weather-icons-react';

const WeatherConditions = (props) => {
	return (
		<div className = "weather-conditions">
			{props.weatherConditions}
			<WiCloud 
				size={24}
				color="#000"
			/>
			&#9650;
			&#9660;
			&#9679;
		</div>
	);
};

export default WeatherConditions;