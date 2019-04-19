import React from 'react';
import { WiFahrenheit } from 'weather-icons-react';

import './Temperature.scss';

const Temperature = (props) => {
	return (
		<div className = "temperature">
			<div className = "temperature__direction-symbol__rising">
				&#9650;
			</div>
			
			<div className = "temperature__digit">
				{
					props.temperature
					? Math.round(props.temperature)
					: '--'
				}
			</div>
			
			<div className = "temperature__unit">
				<WiFahrenheit 
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