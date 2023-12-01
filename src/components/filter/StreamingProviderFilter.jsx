import { useQueryContext } from "@/App";
import { getCountryCode } from "@/helpers/languageHelper";
import { cn } from "@/lib/utils";
import { useEffect } from "react";
import StreamingProviderLabel from "../StreamingProviderLabel";

export default function StreamingProviderFilter({
	providers,
	selectedProvider,
	setSelectedProvider,
}) {
	const { movieQuery, setMovieQuery } = useQueryContext();

	useEffect(() => {
		if (selectedProvider.length > 0) {
			const correctQuery = selectedProvider.join("|");
			setMovieQuery({
				...movieQuery,
				watch_region: getCountryCode(),
				with_watch_providers: correctQuery,
			});
		} else {
			// Erstellen einer Kopie von movieQuery
			let updatedQuery = { ...movieQuery };
			// Entfernen der Eigenschaften
			delete updatedQuery.watch_region;
			delete updatedQuery.with_watch_providers;
			// Aktualisieren des movieQuery-Objekts
			setMovieQuery(updatedQuery);
		}
	}, [selectedProvider]);

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
		<div className="grid grid-cols-3 self-start gap-2">
			{providers.map(({ provider_name, provider_id, logo_path }) => (
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
		</div>
	);
}
