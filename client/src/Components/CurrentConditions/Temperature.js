import React from 'react';
import { WiFahrenheit } from 'weather-icons-react';

const Temperature = (props) => {
	return (
		<div className = "temperature">
			{props.temperature}
			<WiFahrenheit 
				size={24}
				color="#000"
			/>
			&#9650;
			&#9660;
			&#9679;
		</div>
	);
};

export default Temperature;