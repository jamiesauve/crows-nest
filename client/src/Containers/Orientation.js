import React from 'react';
import moment from 'moment';

import './Orientation.scss';

const Orientation = (props) => {
const now = moment();
const date = now.format('MMMM D');
const time = now.format('h:mm a');

	return (
		<div className = "orientation">
			<div className = "orientation__location">
				{props.locationName}
			</div>
			
			<div className = "orientation__section1">
				<div className = "orientation__section1__date">
					{date /* TODO Make these update in real time! */} 
				</div>

				<div className = "orientation__section1__time">
					{time}
				</div>
			</div>
		</div>
	);
};

export default Orientation;