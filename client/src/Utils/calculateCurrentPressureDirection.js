export default (previousPressure, currentPressure) => {
	const pressureChange = currentPressure - previousPressure;
	
	console.log('pressure change', pressureChange);

	// within 0.01 mB is considered steady 
	if (pressureChange > 0.01) return "rising";
	else if (pressureChange < -0.01) return "falling";
	else return "steady";
}