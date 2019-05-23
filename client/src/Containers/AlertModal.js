import React from 'react';
import Modal from 'react-modal';

import './AlertModal.scss';

const AlertModal = (props) => {

	const {
		isOpen,
		closeModal,
		currentAlert,
	} = props;

	const alertData = currentAlert;

	return (
		<Modal
			appElement={document.getElementById('root')}
			className="alert-modal"
			onRequestClose={closeModal}
			isOpen={isOpen}
		>
			{alertData.title}
		</Modal>
	);
};

export default AlertModal;
