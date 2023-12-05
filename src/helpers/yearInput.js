import toast from "react-hot-toast";

export function isCorrectYearInput(
	startYear,
	endYear,
	minimumYear,
	maximumYear
) {
	const beginningValue = parseInt(startYear);
	const endValue = parseInt(endYear);

	if (isNaN(beginningValue) || isNaN(endValue)) {
		toast.error("Please enter valid year numbers.");
		return false;
	}
	if (beginningValue < minimumYear || endValue > maximumYear) {
		toast.error(
			`Please enter a year between ${minimumYear} and ${maximumYear}.`
		);
		return false;
	}
	if (beginningValue > endValue) {
		toast.error("The start year cannot be greater than the end year.");
		return false;
	}

	return true;
}
