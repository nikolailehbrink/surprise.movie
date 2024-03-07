import { cn } from "@/lib/utils";
import StreamingProviderLabel from "../StreamingProviderLabel";
import { StreamingCombobox } from "./StreamingCombobox";

export default function StreamingProviderFilter({
	providers,
	selectedProvider,
	setSelectedProvider,
	customProviders,
	setCustomProviders,
	shownProviders,
	setShownProviders,
}) {
	function handleProviderCheckbox(e) {
		const providerId = parseInt(e.target.value);
		if (!e.target.checked) {
			const updatedProvider = selectedProvider.filter(
				(provider) => provider !== providerId
			);
			setSelectedProvider(updatedProvider);
		} else {
			setSelectedProvider([...selectedProvider, providerId]);
		}
	}

	return (
		<div className="grid grid-cols-3 gap-2">
			{providers.length > 0 &&
				shownProviders.map(({ provider_name, provider_id, logo_path }) => (
					<label
						key={provider_id}
						className=" flex justify-self-start rounded cursor-pointer"
					>
						<input
							className="peer appearance-none"
							checked={selectedProvider.includes(provider_id)}
							type="checkbox"
							value={provider_id}
							onChange={handleProviderCheckbox}
						/>
						<StreamingProviderLabel
							className={cn(
								"peer-checked:grayscale-0 peer-checked:border-white",
								selectedProvider.length > 0 && "grayscale border-white/10"
							)}
							logo={logo_path}
							name={provider_name}
						/>
					</label>
				))}
			<StreamingCombobox
				providers={providers}
				customProviders={customProviders}
				setCustomProviders={setCustomProviders}
				shownProviders={shownProviders}
				setShownProviders={setShownProviders}
			/>
		</div>
	);
}
