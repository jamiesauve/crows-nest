import React, { Component, } from 'react';

class ErrorBoundary extends Component {
	constructor(props) {
		super(props);

		this.state = {
			errorPresent: false,
			error: '',
			errorInfo: '',
		}
	};
	
	static getDerivedStateFromError(error) {
		this.setState({
			errorPresent: true,
		});
	}

	componentDidCatch(error, errorInfo) {
		this.setState({
			error,
			errorInfo,
		})
	}

	render() {
		return (
			<>
				{
					this.state.errorPresent
					? 
					<div>
						THIS IS YOUR ERROR BOUNDARY SPEAKING you have an error. See this component's state for more info.
						{this.state.error}
						{this.state.errorInfo}
					</div>
					: this.props.children	
				}
			</>
		);
	}
};

export default ErrorBoundary;