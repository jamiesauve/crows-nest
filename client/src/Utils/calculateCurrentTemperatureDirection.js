export default (previousTemperature, currentTemperature) => {
	const temperatureChange = currentTemperature - previousTemperature;

	console.log('temp change', temperatureChange);
	
	// within 0.1 degree is considered steady 
	if (temperatureChange > 0.1) return "rising";
	else if (temperatureChange < -0.1) return "rising";
	else return "steady";
};