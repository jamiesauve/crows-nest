import React from 'react';

const Temperature = (props) => {
	return (
		<div className = "temperature">
			The current temperature is {props.temperature} degrees.
		</div>
	);
};

export default Temperature;