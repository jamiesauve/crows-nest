import React from 'react';
import Modal from 'react-modal';
import moment from 'moment';

import './AlertModal.scss';
import getDangerLevel from '../Utils/getDangerLevel';
import getWeatherIconComponent from '../Utils/getWeatherIconComponent';

const AlertModal = (props) => {

	const {
		isOpen,
		closeModal,
		currentAlert,
	} = props;

	const alertData = currentAlert;
	console.log('alertData', alertData);

	const dangerLevel = getDangerLevel(alertData.severity);
	const weatherIcon = getWeatherIconComponent(alertData.weatherCondition);
	const WeatherIconComponent = weatherIcon.icon;

	return (
		<Modal
			appElement={document.getElementById('root')}
			className={`alert-modal alert__${dangerLevel}-danger`}
			onRequestClose={closeModal}
			isOpen={isOpen}
		>
			<div className = "alert-modal__title-container">
				<div className = {`alert-modal__icon-frame alert__${dangerLevel}-danger`}>
					<div className = "alert-modal__icon-frame__icon">
						<WeatherIconComponent
							color={weatherIcon.color}
							size = "72"
						/>
					</div>
				</div>
				
				<div className = "alert-modal__title-container__right-box">
					<div className = "alert-modal__title-container__right-box__title">
						{alertData.title}
					</div>

					<div className = "alert-modal__title-container__right-box__expiry-time">
						until {moment(alertData.expires * 1000).format("h:MM a")}
					</div>
				</div>
			</div>

			<div className = "alert-modal__description-container">
				{alertData.description}
				<br />
				<br />
				<a
					href={alertData.uri}
					rel="noopener noreferrer"
					target="_blank"
				>
					More information
				</a>
			</div>

			<div className = "alert-modal__footer">
				<div 
					className = "alert-modal__footer__close-button"
					onClick = {closeModal}
				>
					Close
				</div>
			</div>
		</Modal>
	);
};

export default AlertModal;
