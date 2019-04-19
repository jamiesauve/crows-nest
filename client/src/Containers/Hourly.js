import React from 'react';

import HourlyCondition from '../Components/Hourly/HourlyCondition';

import './Hourly.scss';

const Hourly = (props) => {

	return (
		<div className = "hourly-condition">
			<HourlyCondition />
		</div>
	)
};

export default Hourly;