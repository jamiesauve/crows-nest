import React from 'react';

import getDirectionSymbol from '../../Utils/getDirectionSymbol';

import './Temperature.scss';
import { WiFahrenheit } from 'weather-icons-react';

const Temperature = (props) => {
	const DirectionSymbol = getDirectionSymbol(props.direction);

	return (
		<div className = "temperature">
			<div className = {props.isLargeSize ? "temperature__digit--large" : "temperature__digit"}>
				{
					props.temperature
					? Math.round(props.temperature)
					: '--'
				}
			</div>
			
			<div className = "temperature__unit">
				<WiFahrenheit 
					size={props.isLargeSize ? 60 : 24}
					color="#fff"
				/>
			</div>

				{DirectionSymbol
				&& <DirectionSymbol 
					isLargeSize={props.isLargeSize}
				/>
				}

			{/* &#9660; */}
			{/* &#9679; */}
		</div>
	);
};

export default Temperature;