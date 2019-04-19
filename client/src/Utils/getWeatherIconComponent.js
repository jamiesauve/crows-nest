import {
	WiDaySunny,
	WiNightClear, 
	WiCloud, 
	WiFog,
	WiHail,
	WiDayCloudy,
	WiNightAltCloudy,
	WiRain,
	WiRefresh,
	WiSleet,
	WiSnow,
	WiTornado,
	WiThunderstorm,
	WiStrongWind

} from 'weather-icons-react';


const getWeatherIconComponent = (label) => {

	switch(label) {
		case "clear-day": {
			return WiDaySunny;
		}
		case "clear-night": {
			return WiNightClear;
		}
		case "cloudy": {
			return WiCloud;
		}
		case "fog": {
			return WiFog;
		}
		case "hail": {
			return WiHail;
		}
		case "partly-cloudy-day": {
			return WiDayCloudy;
		}
		case "partly-cloudy-night": {
			return WiNightAltCloudy;
		}	
		case "rain": {
			return WiRain;
		}
		case "sleet": {
			return WiSleet;
		}
		case "snow": {
			return WiSnow;
		}
		case "tornado": {
			return WiTornado;
		}
		case "thunderstorm": {
			return WiThunderstorm;
		}
		case "wind": {
			return WiStrongWind;
		}
		default:
			return WiRefresh;
	}
};

export default getWeatherIconComponent;