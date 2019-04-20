import React from 'react';

import HourlyCondition from '../Components/Hourly/HourlyCondition';

import './Hourly.scss';

const Hourly = (props) => { 

	return (
		<div className = "hourly-condition">
			<HourlyCondition 
				direction = {props.direction}
			/>
		</div>
	)
};

export default Hourly;