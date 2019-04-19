import React from 'react';

import './Update.scss';

const Update = (props) => {
	return (
		<>
			<div className = "update">
				<div className = "update__last-update">
					Last updated 3 minutes ago.
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