export const getApuUrl = (endpoint: string) => {
	const baseURL = process.env.REACT_APP_API_URL;

	return `${baseURL}${endpoint}`;
};
