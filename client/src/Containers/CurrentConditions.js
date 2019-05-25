import React from 'react';

// import NearestStorm from '../Components/CurrentConditions/NearestStorm';
import Temperature from '../Components/CurrentConditions/Temperature';
import WeatherConditions from '../Components/CurrentConditions/WeatherConditions';

import './CurrentConditions.scss';

const CurrentConditions = (props) => {
	const {
		pressureDirection,
		temperature,
		temperatureDirection,
		weatherConditions,
	} = props;
	
	return (
		<div className = "current-conditions">
				<Temperature 
					temperature={temperature}
					direction={temperatureDirection}
					isLargeSize
				/>
				
				<WeatherConditions
					weatherConditions={weatherConditions}
					direction={pressureDirection}
					isLargeSize
				/>

				{/* <NearestStorm 
					nearestStormDirection={nearestStormDirection}
					nearestStormDistance={nearestStormDistance}
				/> */}
		</div>
	);
};

export default CurrentConditions;