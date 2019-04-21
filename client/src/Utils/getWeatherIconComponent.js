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
			return {
				icon: WiDaySunny,
				color: '#fa0',
			};
		}
		case "clear-night": {
			return {
				icon: WiNightClear,
				color: '#fff',
			};
		}
		case "cloudy": {
			return {
				icon: WiCloud,
				color: '#fff',
			};
		}
		case "fog": {
			return {
				icon: WiFog,
				color: '#fff',
			};
		}
		case "hail": {
			return {
				icon: WiHail,
				color: '#fff',
			};
		}
		case "partly-cloudy-day": {
			return {
				icon: WiDayCloudy,
				color: '#fff',
			};
		}
		case "partly-cloudy-night": {
			return {
				icon: WiNightAltCloudy,
				color: '#fff',
			};
		}	
		case "rain": {
			return {
				icon: WiRain,
				color: '#ccf',
			};
		}
		case "sleet": {
			return {
				icon: WiSleet,
				color: '#ccd',
			};
		}
		case "snow": {
			return {
				icon: WiSnow,
				color: '#fff',
			};
		}
		case "tornado": {
			return {
				icon: WiTornado,
				color: '#aaa',
			};
		}
		case "thunderstorm": {
			return {
				icon: WiThunderstorm,
				color: '#ccd',
			};
		}
		case "wind": {
			return {
				icon: WiStrongWind,
				color: '#ddd',
			};
		}
		default:
		return {
			icon: WiRefresh,
			color: '#fff',
		};
	}
};

export default getWeatherIconComponent;