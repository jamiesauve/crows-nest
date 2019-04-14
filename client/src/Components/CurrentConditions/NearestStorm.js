import React from 'react';

const NearestStorm = (props) => {
	const {
		nearestStormDirection,
		nearestStormDistance,
	} = props;

	const getNearestStormDistanceOutput = () => {
		if (nearestStormDirection === 0) {
			return <span className = "nearest-storm__distance">
				A storm is right overhead. Please take immediate action for your protection and stay away 
				from winDOWS.
			</span>
		}
		
		return (nearestStormDistance)
			? <span  className = "nearest-storm__distance">
					The nearest storm is {(nearestStormDistance * 1.621371 )} miles away.
			</span>
			: <span  className = "nearest-storm__distance">
				There are no storms nearby.
			</span>
	}

	const getNearestStormDirectionOutput = () => {
		if (nearestStormDistance && nearestStormDirection){
			return <span  className = "nearest-storm__direction">
				Direction (degrees): nearestStormDirection // TODO convert this to cardinal directions
			</span>	
		}
		// if it is right overhead, there is no direction
		// if there is no distance, there is no storm nearby
	}

	return (
		<div className = "nearest-storm">
			{getNearestStormDistanceOutput()}
			{getNearestStormDirectionOutput()}
		</div>
	);
};

export default NearestStorm;