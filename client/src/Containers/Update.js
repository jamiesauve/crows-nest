import React from 'react';
import moment from 'moment';

import './Update.scss';

const Update = (props) => {
	const lastUpdatedAt = props.lastUpdatedAt.timeStamp;
	
	const lastUpdateString = (() => {
		const timeSinceLastUpdate = Math.round(moment.now() / 1000) - lastUpdatedAt;

		// TODO this will need to cover edge cases in time.
		// TODO these will need to increment as time passes
		if (timeSinceLastUpdate < 60) {
			// if the last update was within a minute
			return 'Last updated less than a minute ago.';
		}	else if (timeSinceLastUpdate < 60 * 60) {
		// if the last update was within an hour
			return `Last updated ${Math.round(timeSinceLastUpdate / 60)} minutes ago.`;
		} else if (timeSinceLastUpdate < 60 * 60 * 24) {
		// if the last update was within a day
			return `Last updated at ${moment(lastUpdatedAt).format("h:MM a")}`;
		} else {
			// otherwise
			const daysSinceLastUpdate = Math.round(timeSinceLastUpdate / 60 / 60 / 24);
			return `Last updated ${daysSinceLastUpdate} ${daysSinceLastUpdate === 1 ? 'day' : 'days'} ago.`;
		}
	})();

	return (
		<>
			<div className = "update">
				<div className = "update__last-update">
					{lastUpdateString}
				</div>
				<button className = "update__button">
					Update
				</button>
				<div className = "update__next-update">
					Next update in 15 seconds.
				</div>
			</div>

			{ props.errorMessage
				&& <div className = "update__error-message">
					{props.errorMessage}
				</div>
			}
		</>
	)
};

export default Update;