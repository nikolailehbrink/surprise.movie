import { useState } from "react";
import { fetchMovieDb, imageBase } from "../../helpers/movieDb";
import { useEffect } from "react";

export default function Filter({ movieQuery, setMovieQuery }) {
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
				watch_region: "DE",
				with_watch_providers: correctQuery,
			});
		}
		console.log(selectedProvider);
	}, [selectedProvider]);

	function handleProviderCheckbox(e) {
		const providerId = parseInt(e.target.value);
		if (!e.target.checked) {
			console.log(providerId);
			const updatedProvider = selectedProvider.filter(
				(provider) => provider !== providerId
			);
			setSelectedProvider(updatedProvider);
		} else {
			setSelectedProvider([...selectedProvider, providerId]);
		}
	}

	console.log({ movieQuery });
	async function getMovieProviders() {
		try {
			const { results } = await fetchMovieDb(`watch/providers/movie`, {
				query: { watch_region: "US" },
			});
			// console.log(results);
			const movieProviders = results
				.sort((a, b) => a.display_priority - b.display_priority)
				.slice(0, 10);
			setProviders(movieProviders);
		} catch (error) {
			console.log(error);
		}
	}
	return (
		<fieldset className="flex">
			<legend>Choose your streaming services:</legend>
			<div className="grid grid-cols-5 self-start gap-3">
				{providers.map(({ provider_name, provider_id, logo_path }) => (
					<label
						key={provider_id}
						className=" flex justify-self-start rounded cursor-pointer"
					>
						<input
							className="peer appearance-none absolut"
							type="checkbox"
							value={provider_id}
							onChange={handleProviderCheckbox}
						/>
						<div className="border-2 p-2 rounded-2xl grayscale border-white/10 peer-checked:grayscale-0 peer-checked:border-white">
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
