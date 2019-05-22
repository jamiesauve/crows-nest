import React, { Component } from 'react';
import {pick as _pick, } from 'lodash';
import axios from 'axios';
import moment from 'moment';

import './App.scss';
import Orientation from './Containers/Orientation';
import CurrentConditions from './Containers/CurrentConditions';
import Hourly from './Containers/Hourly';
import Alerts from './Containers/Alerts';
import Update from './Containers/Update';
import SectionDivider from './Components/Utility/SectionDivider';
import ErrorBoundary from './Components/Utility/ErrorBoundary';

class App extends Component {
  constructor() {
		super();

		this.state = {
			alerts: [
				// sample object
				// {
				// 	description: '',
				// 	regions: [
				// 		'',
				// 	],
				// 	severity: '',
				// 	timeExpires: 0,
				// 	timeIssued: 0,
				// 	title: '',
				// 	uri: '',
				// }
			],
			currentConditions: {
				temperature: undefined,
				isTemperatureRising: false, // TODO calculate this
				nearestStormDirection: undefined,
				nearestStormDistance: undefined,
			},
			data: {},
			errorMessage: '',
			hourlyConditionsList: [],
			isLoading: true, // TODO use React.lazy instead of this
			lastUpdatedAt: {
				timeStamp: 0,
				formatted: '',
			},
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
			let data;

			if(payload.data.error) {
				this.setState({
					errorMessage: "Crow's Nest cannot update without an internet connection",
				});

				//get data from localStorage instead
				data = JSON.parse(localStorage.getItem('mostRecentData'));
			} else {
				data = payload.data.data;
				localStorage.setItem('mostRecentData', JSON.stringify(data));
			}
			
			// pull bits I need off of the payload
			const currentConditions = _pick(data.currently, [
				'temperature',
				'icon',
				'nearestStormDirection',
				'nearestStormDistance',
			])

			const hourlyConditionsList = data.hourly.data.map((hourlyCondition) => ({
					temperature: hourlyCondition.temperature,
					weatherConditions: hourlyCondition.icon,
					time: moment(hourlyCondition.time * 1000).format("h A"), // DarkSky's value is in seconds, not milliseconds
				}));

			const alerts = data.alerts;

			this.setState({
				alerts,
				currentConditions: {
					temperature: currentConditions.temperature,
					weatherConditions: currentConditions.icon,
					// TODO add temperatureChange (rising/falling/steady)
					// TODO add pressureChange (rising/falling/steady)
				},
				isLoading: false,
				hourlyConditionsList,
				lastUpdatedAt: {
					timeStamp: data.currently.time,
					formatted: moment(data.currently.time * 1000).format("h A"),
				}
			});
		})
	};

	render() {
		const {
			alerts,
			currentConditions,
			errorMessage,
			hourlyConditionsList,
			isLoading,
			lastUpdatedAt,
		} = this.state;

    return (
      <div className="App">
				{
					!isLoading &&
					<>
						<ErrorBoundary>
							<Orientation 
								locationName="Saint Charles" // TODO hardcoded
								date="April 12"
								time="8:00 PM"
								/>
						</ErrorBoundary>
						
						<SectionDivider />

						<ErrorBoundary>
							<CurrentConditions 
								temperature={currentConditions.temperature}
								weatherConditions={currentConditions.weatherConditions} // TODO icon in component is hardcoded to cloudy
								/>
						</ErrorBoundary>

						<SectionDivider />

						<ErrorBoundary>
							<Hourly 
								hourlyConditionsList={hourlyConditionsList}
								temperatureDirection={"falling"}
								/>
						</ErrorBoundary>

						<SectionDivider />

						<ErrorBoundary>
							<Alerts 
								alerts={alerts}
								currentConditions={currentConditions}
								hourlyConditionsList={hourlyConditionsList}
								nearestStormDirection={currentConditions.nearestStormDirection}
								nearestStormDistance={currentConditions.nearestStormDistance}
							/>
						</ErrorBoundary>

						<SectionDivider />

						<ErrorBoundary>
							<Update 
								errorMessage={errorMessage}
								lastUpdatedAt={lastUpdatedAt}
								/>
						</ErrorBoundary>
					</>
				}
      </div>
    );
  }
}

export default App;
