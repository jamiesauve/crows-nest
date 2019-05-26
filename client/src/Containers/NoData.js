import React from 'react';

import './NoData.scss';

const NoData = (props) => (
	<div className = "no-data">
		<div className = "no-data__message">
			No weather data available. Please connect to the internet!
		</div>

		<div 
			className="no-data__button"
			onClick={props.fetchWeather}
		>
			Try Now
		</div>
	</div>
);

export default NoData;