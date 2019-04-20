import React, { Component } from 'react';
import {pick as _pick, } from 'lodash';
import axios from 'axios';


import './App.scss';
import Orientation from './Containers/Orientation';
import CurrentConditions from './Containers/CurrentConditions';
import Hourly from './Containers/Hourly';
import Alerts from './Containers/Alerts';
import Update from './Containers/Update';
import SectionDivider from './Components/Utility/SectionDivider';

class App extends Component {
  constructor() {
		super();

		this.state = {
			currentConditions: {
				temperature: undefined,
				isTemperatureRising: false,
				
				// nearestStormDirection: undefined,
				// nearestStormDistance: undefined,
			},
			data: {},
			errorMessage: '',
			hourlyConditions: {},
			isLoading: true, // TODO use React.lazy instead of this
			location: {
				//St Charles, MO
				lng: -90.497,
				lat: 38.788,
			},
			updateInterval: 180000, // 3 minutes
		}

		this.fetchWeather = this.fetchWeather.bind(this);
		this.trackWeather = this.trackWeather.bind(this);

		this.trackWeather();
	}

	trackWeather() {
		this.fetchWeather(); //initial call

		setInterval(
			this.fetchWeather,
			this.state.updateInterval,
		);
	};

	fetchWeather() {
		const {
			lat,
			lng,
		} = this.state.location;

		axios({
			method: 'get',
			url: 'http://localhost:4205/api/getWeather', 
			params: {
				lat,
				lng
			},
			headers: {
				'Content-Type': 'application/json',
			},
		}).then((payload) => {
			console.log('payload', payload);
			if(payload.data.error) {
				this.setState({
					errorMessage: 'Could not update weather - no internet connection',
				})
			} else {
				// pull bits I need off of the payload
				const currentConditions = _pick(payload.data.data.currently, [
					'temperature',
					'icon',
					// 'nearestStormDirection',
					// 'nearestStormDistance',
				])

				const hourlyConditions = payload.data.data.hourly.data;
	
				this.setState({
					currentConditions: {
						temperature: currentConditions.temperature,
						weatherConditions: currentConditions.icon,
						// TODO add temperatureChange (rising/falling/steady) - will require time machine
						// TODO add pressureChange (rising/falling/steady)
					},
					hourlyConditions,
				});
			}

		})
	};

	render() {
		const {
			errorMessage,
			hourlyConditions,
		} = this.state;

		const {
			temperature,
      weatherConditions,
			// nearestStormDirection,
			// nearestStormDistance,
		} = this.state.currentConditions;

    return (
      <div className="App">
        <Orientation 
          locationName="Saint Charles" // TODO hardcoded
          date="April 12"
          time="8:00 PM"
        />
        
				<SectionDivider />

        <CurrentConditions 
          temperature={temperature}
					weatherConditions={weatherConditions} // TODO icon in component is hardcoded to cloudy
        />

				<SectionDivider />

        <Hourly 
					hourlyConditions={hourlyConditions}
				/>

				<SectionDivider />

        <Alerts />

				<SectionDivider />

        <Update 
					errorMessage={errorMessage}
				/>
      </div>
    );
  }
}

export default App;
