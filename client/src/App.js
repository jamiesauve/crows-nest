import React, { Component } from 'react';
import {pick as _pick, } from 'lodash';
import axios from 'axios';
import moment from 'moment';
import Spinner from 'react-loader-spinner';

import './App.scss';
import Orientation from './Containers/Orientation';
import CurrentConditions from './Containers/CurrentConditions';
import Hourly from './Containers/Hourly';
import Alerts from './Containers/Alerts';
import Update from './Containers/Update';
import AlertModal from './Containers/AlertModal';

import SectionDivider from './Components/Utility/SectionDivider';
import ErrorBoundary from './Components/Utility/ErrorBoundary';
import calculateCurrentTemperatureDirection from './Utils/calculateCurrentTemperatureDirection';
import calculateCurrentPressureDirection from './Utils/calculateCurrentPressureDirection';

class App extends Component {
  constructor() {
		super();

		this.state = {
			alertModalIsOpen: false,
			alerts: [],
			currentAlert: {},
			currentConditions: {
				temperature: undefined,
				pressure: undefined,
				temperatureDirection: undefined,
				pressureDirection: undefined,
				nearestStormDirection: undefined,
				nearestStormDistance: undefined,
			},
			previousConditions: {
				temperature: undefined,
				pressure: undefined,
			},
			data: {},
			errorMessage: '',
			hourlyConditionsList: [],
			isFetching: false,
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
		this.closeAlertModal = this.closeAlertModal.bind(this);
		this.openAlertModal = this.openAlertModal.bind(this);
		this.setCurrentAlert = this.setCurrentAlert.bind(this);
	}

	componentDidMount() {
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

		this.setState({
			isFetching: true,
		});

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
			let mostRecentData;
			let ageingData;
			let previousData;

			if(payload.data.error) {
				this.setState({
					errorMessage: "Crow's Nest cannot update without an internet connection",
				});

				//get data from localStorage instead
				mostRecentData = JSON.parse(localStorage.getItem('mostRecentData'));
				ageingData = JSON.parse(localStorage.getItem('ageingData'));
				previousData = JSON.parse(localStorage.getItem('previousData'));

			} else {
				mostRecentData = payload.data.data;

				previousData = JSON.parse(localStorage.getItem('previousData'));
				ageingData = JSON.parse(localStorage.getItem('ageingData'));

				// if previousData is more than an hour old, set it to null
				if (previousData && (mostRecentData.currently.time - previousData.currently.time) > 3600) {
					localStorage.removeItem('previousData');
				};
				console.log('time since ageingData', mostRecentData.currently.time - ageingData.currently.time);
				console.log('time since previousData', mostRecentData.currently.time - previousData.currently.time);
				// if ageingData is more than 3 minutes old, replace previous with ageing and ageing with current
				if(!ageingData  || (mostRecentData.currently.time - ageingData.currently.time) > 180) {
					localStorage.setItem('previousData', JSON.stringify(ageingData));
					previousData = ageingData;
					localStorage.setItem('ageingData', JSON.stringify(mostRecentData));
				}

				// set mostRecentData to most recent update, regardless of everything else
				localStorage.setItem('mostRecentData', JSON.stringify(mostRecentData));
			}

			// pull bits I need off of the payload
			const currentConditions = _pick(mostRecentData.currently, [
				'temperature',
				'pressure',
				'icon',
				'nearestStormDirection',
				'nearestStormDistance',
			]);

			const previousConditions = previousData 
			? _pick(previousData.currently, [
				'temperature',
				'pressure',
			])
			: {
				'temperature': undefined,
				'pressure': undefined,
			};

			const hourlyConditionsList = mostRecentData.hourly.data.map((hourlyCondition) => ({
					temperature: hourlyCondition.temperature,
					weatherConditions: hourlyCondition.icon,
					time: moment(hourlyCondition.time * 1000).format("h A"), // DarkSky's value is in seconds, not milliseconds
				}));

			const alerts = mostRecentData.alerts;

			this.setState((prevState) => ({
				alerts,
				currentConditions: {
					...prevState.currentConditions,
					temperature: currentConditions.temperature,
					pressure: currentConditions.pressure,
					weatherConditions: currentConditions.icon,
					// TODO add temperatureChange (rising/falling/steady)
					// TODO add pressureChange (rising/falling/steady)
				},
				previousConditions: {
					temperature: previousConditions.temperature,
					pressure: previousConditions.pressure,
				},
				isLoading: false,
				isFetching: false,
				hourlyConditionsList,
				lastUpdatedAt: {
					timeStamp: mostRecentData.currently.time,
					formatted: moment(mostRecentData.currently.time * 1000).format("h A"),
				}
			}));


			const previousTime = previousData
			? previousData.currently.time
			: null;
			// measurements are taken with previous data that is between 3 minutes and 1 hour older than current data
			const timeSincePreviousData = mostRecentData.currently.time - previousTime;

			// TODO this is not working
			if ((timeSincePreviousData < 3600)) {
				const currentTemperatureDirection = calculateCurrentTemperatureDirection(previousConditions.temperature, currentConditions.temperature);
				const currentPressureDirection = calculateCurrentPressureDirection(previousConditions.pressure, currentConditions.pressure);

				this.setState((prevState) => ({
					currentConditions: {
						...prevState.currentConditions,
						temperatureDirection: currentTemperatureDirection,
						pressureDirection: currentPressureDirection,
					}
				}));
			}


			
		});
	};

	openAlertModal() {
		this.setState({
			alertModalIsOpen: true,
		});
	}

	closeAlertModal() {
		this.setState({
			alertModalIsOpen: false,
		});
	}

	setCurrentAlert(currentAlert) {
		this.setState({
			currentAlert,
		});
	}

	render() {
		const {
			alertModalIsOpen,
			alerts,
			currentAlert,
			currentConditions,
			errorMessage,
			hourlyConditionsList,
			isLoading,
			lastUpdatedAt,
		} = this.state;

    return (
      <div className="app">
				{
					this.state.isFetching &&
					<div className = "app__foreground">
						<Spinner

							type="TailSpin"
							color="#ddd"
							height="50"
							width="50"
						/>

						<div className = "app__fetching-screen" />
					</div>
				}

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
								pressureDirection={currentConditions.pressureDirection}
								temperature={currentConditions.temperature}
								temperatureDirection={currentConditions.temperatureDirection}
								weatherConditions={currentConditions.weatherConditions}
								/>
						</ErrorBoundary>

						<SectionDivider />

						<ErrorBoundary>
							<Hourly 
								hourlyConditionsList={hourlyConditionsList}
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
								openAlertModal={this.openAlertModal}
								setCurrentAlert={this.setCurrentAlert}
							/>
						</ErrorBoundary>

						<SectionDivider />

						<ErrorBoundary>
							<Update 
								errorMessage={errorMessage}
								lastUpdatedAt={lastUpdatedAt}
								fetchWeather={this.fetchWeather}
								/>
						</ErrorBoundary>

						<ErrorBoundary>
							<AlertModal
								isOpen={alertModalIsOpen}
								closeModal={this.closeAlertModal}
								currentAlert={currentAlert}
							/>
						</ErrorBoundary>
					</>
				}
      </div>
    );
  }
}

export default App;
