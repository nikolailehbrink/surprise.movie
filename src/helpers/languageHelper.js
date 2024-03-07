export const getUserRegion = () => {
	const browserLanguage = navigator.language;
	const region = new Intl.Locale(browserLanguage).region;
	return region ?? "US";
};
