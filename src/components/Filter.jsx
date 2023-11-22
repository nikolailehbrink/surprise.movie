import { useState } from "react";
import { fetchMovieDb, imageBase } from "../../helpers/movieDb";
import { useEffect } from "react";

export default function Filter({ movieQuery, setMovieQuery }) {
	const [providers, setProviders] = useState([]);
	const [selectedProvider, setSelectedProvider] = useState([]);

	const [genres, setGenres] = useState([]);
	const [selectedGenres, setSelectedGenres] = useState([]);

	console.log(movieQuery);

	useEffect(() => {
		getMovieProviders();
		getMovieGenres();
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
		// console.log(selectedProvider);
	}, [selectedProvider]);

	useEffect(() => {
		if (selectedGenres.length > 0) {
			const correctQuery = selectedGenres.join("|");
			setMovieQuery({
				...movieQuery,
				with_genres: correctQuery,
			});
		}
		// console.log(selectedProvider);
	}, [selectedGenres]);

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

	function handleGenreCheckbox(e) {
		const genreId = parseInt(e.target.value);
		if (!e.target.checked) {
			const updatedGenres = selectedGenres.filter((genre) => genre !== genreId);
			setSelectedGenres(updatedGenres);
		} else {
			setSelectedGenres([...selectedGenres, genreId]);
		}
	}

	async function getMovieGenres() {
		try {
			let { genres: availableGenres } = await fetchMovieDb(`genre/movie/list`);
			availableGenres = availableGenres.sort((a, b) =>
				a.name.localeCompare(b.name)
			);

			// console.log(availableGenres);
			setGenres(availableGenres);
		} catch (error) {
			console.log(error);
		}
	}

	// console.log({ movieQuery });
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
		<div className="flex gap-2">
			<fieldset className="flex shrink-0 flex-wrap border-2 border-white/25 p-3 rounded-3xl">
				<legend className="px-2 font-bold text-lg">
					Choose your streaming services:
				</legend>
				<div className="grid grid-cols-5 self-start gap-3">
					{providers.map(({ provider_name, provider_id, logo_path }) => (
						<label
							key={provider_id}
							className=" flex justify-self-start rounded cursor-pointer"
						>
							{/* TODO: Delete absolut */}
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
			<fieldset className="flex items-start flex-wrap border-2 border-white/25 p-3 rounded-3xl max-w-lg">
				<legend className="px-2 font-bold text-lg">Choose your genres:</legend>
				<div className="flex flex-wrap gap-3">
					{genres.map(({ id, name }) => (
						<label key={id} className="gap-1 flex items-center ">
							<input
								className="peer"
								type="checkbox"
								value={id}
								onChange={handleGenreCheckbox}
							/>
							<p className="opacity-30 peer-checked:opacity-100">{name}</p>
						</label>
					))}
				</div>
			</fieldset>
		</div>
	);
}
