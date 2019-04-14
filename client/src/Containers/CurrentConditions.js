import React, { Component, } from 'react';

// import NearestStorm from '../Components/CurrentConditions/NearestStorm';
import Temperature from '../Components/CurrentConditions/Temperature';
import WeatherConditions from '../Components/CurrentConditions/WeatherConditions';

const CurrentConditions = (props) => {
	const {
		temperature,
		weatherConditions,
	} = props;
	
	return (
		<div className = "at-a-glance">
			<div>
				<Temperature 
					temperature={temperature}
				/>
				
				<WeatherConditions
					weatherConditions={weatherConditions}
				/>

				{/* <NearestStorm 
					nearestStormDirection={nearestStormDirection}
					nearestStormDistance={nearestStormDistance}
				/> */}

				
			</div>
		</div>
	);
};

export default CurrentConditions;