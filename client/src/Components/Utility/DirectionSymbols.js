import React from 'react';

import './DirectionSymbols.scss';

const RisingSymbol = (props) => (
	<div className = {props.isLargeSize ? "direction-symbol__rising--large" : "direction-symbol__rising"}>
		&#9650;
	</div>
);

const SteadySymbol = (props) => (
	<div className = {props.isLargeSize ? "direction-symbol__steady--large" : "direction-symbol__steady"}>
		&#9679;
	</div>
);

const FallingSymbol = (props) => (
	<div className = {props.isLargeSize ? "direction-symbol__falling--large" : "direction-symbol__falling"}>
		&#9660;
	</div>
);

const DefaultSymbol = (props) => (
	<div className = {props.isLargeSize ? "direction-symbol__default--large" : "direction-symbol__default"}>
		-
	</div>
)

export {
	RisingSymbol,
	SteadySymbol,
	FallingSymbol,
	DefaultSymbol,
};