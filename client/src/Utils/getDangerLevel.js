export default (severity) => {
	switch(severity) {
		case "warning":
			return "high";
		case "watch":
			return "medium"; 
		default:
			return "low";
	};
};