import {
	WiDaySunny,
	WiFlood,
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
	WiStrongWind,
	WiTornado,
	WiThunderstorm,
	WiVolcano,

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
		case "flood": {
			return {
				icon: WiFlood,
				color: '#66f',
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
				color: '#aac',
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
			icon: WiVolcano,
			color: '#fff',
		};
	}
};

export default getWeatherIconComponent;