import { ArrowsLeftRight, CheckCircle } from "@phosphor-icons/react";
import { PopoverClose } from "@radix-ui/react-popover";
import { useRef } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { isCorrectYearInput } from "@/helpers/yearInput";

export default function YearFilter({
	beginningYear,
	setBeginningYear,
	endYear,
	setEndYear,
	minimumYear,
	currentYear,
	yearFilterOpen,
	setYearFilterOpen,
}) {
	const beginningRef = useRef();
	const endRef = useRef();

	function handleYearChange() {
		const beginningValue = parseInt(beginningRef.current.value);
		const endValue = parseInt(endRef.current.value);

		if (
			!isCorrectYearInput(beginningValue, endValue, minimumYear, currentYear)
		) {
			return;
		}

		setBeginningYear(beginningValue);
		setEndYear(endValue);
		setYearFilterOpen(!yearFilterOpen);
	}

	return (
		<div className="flex gap-2 text-white items-center">
			<Input
				ref={beginningRef}
				className="focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:ring-transparent focus-visible:border-white"
				type="number"
				placeholder={minimumYear}
				defaultValue={beginningYear}
				name="minYear"
				id="minYear"
				min={1895}
				max={endYear}
			/>

			<ArrowsLeftRight size={24} weight="duotone" className="shrink-0" />
			<Input
				ref={endRef}
				className="focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:ring-transparent focus-visible:border-white"
				type="number"
				placeholder="2023"
				defaultValue={endYear}
				name="maxYear"
				id="maxYear"
				min={beginningYear}
				max={currentYear}
			/>

			<Button onClick={handleYearChange} variant="outline" size="icon">
				<CheckCircle size={24} weight="duotone" />
			</Button>
		</div>
	);
}
