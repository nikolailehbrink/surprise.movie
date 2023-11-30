export const getCountryCode = () => {
	const browserLanguage = navigator.language;
	return browserLanguage.slice(-2).toUpperCase();
};
