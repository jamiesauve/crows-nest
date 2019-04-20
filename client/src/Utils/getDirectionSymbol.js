import {
	RisingSymbol,
	SteadySymbol,
	FallingSymbol,
	DefaultSymbol,
} from '../Components/Utility/DirectionSymbols';


const getDirectionSymbol = (direction) => {

	switch(direction) {
		case "rising": {
			return RisingSymbol;
		}
		case "steady": {
			return SteadySymbol;
		}
		case "falling": {
			return FallingSymbol;
		}
		default:
			return DefaultSymbol;
	}
};

export default getDirectionSymbol;