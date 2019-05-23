import React from 'react';
import Modal from 'react-modal';

import './AlertModal.scss';

const AlertModal = (props) => {

	const {
		isOpen,
		closeModal,
	} = props;

	return (
		<Modal
			appElement={document.getElementById('root')}
			className="alert-modal"
			onRequestClose={closeModal}
			isOpen={isOpen}
		>
			Hi!
		</Modal>
	);
};

export default AlertModal;