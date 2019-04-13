import React, { Component, } from 'react';
import {pick as _pick, } from 'lodash';
import axios from 'axios';

import NearestStorm from '../Components/AtAGlance/NearestStorm';
import Temperature from '../Components/AtAGlance/Temperature';

class AtAGlance extends Component {
	constructor() {
		super();

		this.state = {
			currentConditions: {
				temperature: undefined,
				isTemperatureRising: false,

				nearestStormDirection: undefined,
				nearestStormDistance: undefined,
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
				'nearestStormDirection',
				'nearestStormDistance',
			])

			this.setState({
				currentConditions,
			});
		})
	}

	render() {
		const {
			isLoading,
		} = this.props;

		const {
			temperature,
			nearestStormDirection,
			nearestStormDistance,
		} = this.state.currentConditions;

		return (
			<div className = "at-a-glance">
				{
					!isLoading
					&& <div>
						<Temperature 
							temperature={temperature}
						/>
						
						<NearestStorm 
							nearestStormDirection={nearestStormDirection}
							nearestStormDistance={nearestStormDistance}
						/>

						
					</div>

				}
			</div>
		);
	}
};

export default AtAGlance;