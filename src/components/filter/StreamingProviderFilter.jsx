import { useQueryContext } from "@/App";
import { getCountryCode } from "@/helpers/languageHelper";
import { fetchMovieDb } from "@/helpers/movieDb";
import { cn } from "@/lib/utils";
import { useEffect } from "react";
import StreamingProviderLabel from "../StreamingProviderLabel";

export default function StreamingProviderFilter({
	providers,
	setProviders,
	selectedProvider,
	setSelectedProvider,
}) {
	const { movieQuery, setMovieQuery } = useQueryContext();

	useEffect(() => {
		async function getMovieProviders() {
			try {
				const { results } = await fetchMovieDb(`watch/providers/movie`, {
					query: {
						watch_region: getCountryCode(),
					},
				});
				const movieProviders = results
					.sort((a, b) => a.display_priority - b.display_priority)
					.slice(0, 9);
				setProviders(movieProviders);
			} catch (error) {
				console.log(error);
			}
		}
		getMovieProviders();
	}, []);

	useEffect(() => {
		if (selectedProvider.length > 0) {
			const correctQuery = selectedProvider.join("|");
			setMovieQuery({
				...movieQuery,
				watch_region: getCountryCode(),
				with_watch_providers: correctQuery,
			});
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
