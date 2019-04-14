import React from 'react';
// import moment from 'moment';

const Orientation = (props) => {
	const formatDate = (date) => {
		// TODO add formatting logic
		return date;
	};

	const formatTime = (time) => {
		// TODO add formatting logic
		return time;
	};

	return (
		<div className = "orientation">
			<div className = "orientation__location">
				{props.locationName}
			</div>
			
			<div className = "orientation__section1">
				<div className = "orientation__section1__date">
					{formatDate(props.date)}
				</div>

				<div className = "orientation__section1__time">
					{formatTime(props.time)}
				</div>
			</div>
		</div>
	);
};

export default Orientation;