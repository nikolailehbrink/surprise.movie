import { fetchMovieDb, imageBase } from "@/helpers/movieDb";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useEffect } from "react";

export default function StreamingProviderFilter({ movieQuery, setMovieQuery }) {
	const [providers, setProviders] = useState([]);
	const [selectedProvider, setSelectedProvider] = useState([]);

	useEffect(() => {
		getMovieProviders();
	}, []);

	useEffect(() => {
		if (selectedProvider.length > 0) {
			const correctQuery = selectedProvider.join("|");
			setMovieQuery({
				...movieQuery,
				watch_region: navigator.language.substring(
					navigator.language.length - 2
				),
				with_watch_providers: correctQuery,
			});
		}
		console.log(selectedProvider);
	}, [selectedProvider]);

	function handleProviderCheckbox(e) {
		const providerId = parseInt(e.target.value);
		if (!e.target.checked) {
			// console.log(providerId);
			const updatedProvider = selectedProvider.filter(
				(provider) => provider !== providerId
			);
			setSelectedProvider(updatedProvider);
		} else {
			setSelectedProvider([...selectedProvider, providerId]);
		}
	}

	function handleProviderContextMenu(e) {
		e.preventDefault();
		console.log(e);
		const providerId = parseInt(e.target.value);

		setSelectedProvider([providerId]);
	}

	// console.log({ movieQuery });
	async function getMovieProviders() {
		try {
			const { results } = await fetchMovieDb(`watch/providers/movie`, {
				query: {
					watch_region: navigator.language.substring(
						navigator.language.length - 2
					),
				},
			});
			const movieProviders = results
				.sort((a, b) => a.display_priority - b.display_priority)
				.slice(0, 10);
			setProviders(movieProviders);
		} catch (error) {
			console.log(error);
		}
	}
	return (
		<fieldset className="flex shrink-0 flex-wrap border-2 border-white/25 p-3 rounded-3xl">
			<legend className="px-2 font-bold">
				Choose your streaming services:
			</legend>
			<div className="grid grid-cols-5 self-start gap-3">
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
							onContextMenu={handleProviderContextMenu}
						/>
						<div
							className={cn(
								"border-2 p-2 rounded-2xl border-white/10 peer-checked:grayscale-0 peer-checked:border-white",
								selectedProvider.length > 0 && "grayscale"
							)}
						>
							<img
								className="rounded-lg h-12 flex"
								src={`${imageBase}original/${logo_path}`}
								alt={`Logo ${provider_name}`}
							/>
						</div>
					</label>
				))}
			</div>
		</fieldset>
	);
}
