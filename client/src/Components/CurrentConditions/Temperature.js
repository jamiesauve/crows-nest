import React from 'react';

import getWeatherIconComponent from '../../Utils/getWeatherIconComponent';
import getDirectionSymbol from '../../Utils/getDirectionSymbol';

import './Temperature.scss';

const Temperature = (props) => {
	const Component = getWeatherIconComponent(props.weatherConditions);
	const DirectionSymbol = getDirectionSymbol(props.direction);

	return (
		<div className = "temperature">
			<DirectionSymbol />
			
			<div className = "temperature__digit">
				{
					props.temperature
					? Math.round(props.temperature)
					: '--'
				}
			</div>
			
			<div className = "temperature__unit">
				<Component 
					size={36}
					color="#fff"
				/>
			</div>

			{/* &#9660; */}
			{/* &#9679; */}
		</div>
	);
};

export default Temperature;