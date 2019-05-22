import React, { useState, useEffect, } from 'react';
import moment from 'moment';

import './Orientation.scss';

const Orientation = (props) => {
	const [currentDate, setCurrentDate, ] = useState(moment().format('MMMM D'));
	const [currentTime, setCurrentTime, ] = useState(moment().format('h:mm a'));

	// between this and useEffect, time will get updated every second but not necessarily on the second.
	const updateDateAndTime = () => {
		const now = moment();
		setCurrentDate(now.format('MMMM D'));
		setCurrentTime(now.format('h:mm a'));
	};

	let doThisEverySecond = 0;

	useEffect(() => {
		if (doThisEverySecond) {
			clearInterval(doThisEverySecond);
		}

		doThisEverySecond = setInterval(updateDateAndTime, 1000);

		return () => {
			clearInterval(doThisEverySecond);
		}
	});

	return (
		<div className = "orientation">
			<div className = "orientation__location">
				{props.locationName}
			</div>
			
			<div className = "orientation__section1">
				<div className = "orientation__section1__date">
					{currentDate} 
				</div>

				<div className = "orientation__section1__time">
					{currentTime}
				</div>
			</div>
		</div>
	);
};

export default Orientation;