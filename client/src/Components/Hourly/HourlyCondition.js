import React from 'react';

import { WiFahrenheit } from 'weather-icons-react';
import getWeatherIconComponent from '../../Utils/getWeatherIconComponent';
import getDirectionSymbol from '../../Utils/getDirectionSymbol';

const HourlyCondition = (props) => {
	const Component = getWeatherIconComponent(props.weatherConditions);
	const DirectionSymbol = getDirectionSymbol(props.directionSymbol);

	return (
		<div className = "hourly-condition">
			<Component 
				size={48}
				color="#fff"
				/>

			<DirectionSymbol />

			{/* 
			// in a tooltip
			<div className = "hourly-condition__label">
				{props.weatherConditions}
			</div>	 */}

			{/* &#9650; */}
			{/* &#9679; */}

			<div className = "hourly-condition__digit">
				{
					props.temperature
					? Math.round(props.temperature)
					: '--'
				}
			</div>

			<div className = "hourly-condition__unit">
				<WiFahrenheit 
					size={36}
					color="#fff"
				/>
			</div>
		</div>
	)
};

export default HourlyCondition;