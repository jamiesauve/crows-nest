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

class App extends Component {
  constructor() {
		super();

		this.state = {
			alertModalIsOpen: false,
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
				isFetching: false,
				hourlyConditionsList,
				lastUpdatedAt: {
					timeStamp: data.currently.time,
					formatted: moment(data.currently.time * 1000).format("h A"),
				}
			});
		})
	};

	openAlertModal() {
		console.log('opening');
		this.setState({
			alertModalIsOpen: true,
		});
	}

	closeAlertModal() {
		this.setState({
			alertModalIsOpen: false,
		});
	}

	render() {
		const {
			alertModalIsOpen,
			alerts,
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
								openAlertModal={this.openAlertModal}
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
							/>
						</ErrorBoundary>
					</>
				}
      </div>
    );
  }
}

export default App;
