import React from 'react';

import './DirectionSymbols.scss';

const RisingSymbol = () => (
	<div className = "direction-symbol__rising">
		&#9650;
	</div>
);

const SteadySymbol = () => (
	<div className = "direction-symbol__steady">
		&#9679;
	</div>
);

const FallingSymbol = () => (
	<div className = "direction-symbol__falling">
		&#9660;
	</div>
);

const DefaultSymbol = () => (
	<div className = "direction-symbol__default">
		-
	</div>
)

export {
	RisingSymbol,
	SteadySymbol,
	FallingSymbol,
	DefaultSymbol,
};