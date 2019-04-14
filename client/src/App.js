import React, { Component } from 'react';
import {pick as _pick, } from 'lodash';
import axios from 'axios';


import './App.css';
import Orientation from './Containers/Orientation';
import CurrentConditions from './Containers/CurrentConditions';
import Hourly from './Containers/Hourly';

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
			updateInterval: 180000, // 3 minutes
			isLoading: true,
			location: {
				//St Charles, MO - not correct?
				lng: -90.497,
				lat: -38.788,
			},
			data: {},
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
			// pull bits I need off of the payload
			const currentConditions = _pick(payload.data.currently, [
        'temperature',
        'icon'
				// 'nearestStormDirection',
				// 'nearestStormDistance',
			])

			this.setState({
        currentConditions: {
          temperature: currentConditions.temperature,
          weatherConditions: currentConditions.icon,
          // TODO add temperatureChange (rising/falling/steady) - will require time machine
          // TODO add pressureChange (rising/falling/steady)
        }
			});
		})
	}

	render() {
		const {
			isLoading,
		} = this.props;

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
        
        <CurrentConditions 
          temperature={temperature}
					weatherConditions={weatherConditions} // TODO icon in component is hardcoded to cloudy
        />

        <Hourly />
      </div>
    );
  }
}

export default App;
