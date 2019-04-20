import React from 'react';

// import NearestStorm from '../Components/CurrentConditions/NearestStorm';
import Temperature from '../Components/CurrentConditions/Temperature';
import WeatherConditions from '../Components/CurrentConditions/WeatherConditions';

import './CurrentConditions.scss';

const CurrentConditions = (props) => {
	const {
		temperature,
		weatherConditions,
	} = props;
	
	return (
		<div className = "current-conditions">
				<Temperature 
					temperature={temperature}
					direction={"rising"}
				/>
				
				<WeatherConditions
					weatherConditions={weatherConditions}
					direction={"falling"}
				/>

				{/* <NearestStorm 
					nearestStormDirection={nearestStormDirection}
					nearestStormDistance={nearestStormDistance}
				/> */}
		</div>
	);
};

export default CurrentConditions;