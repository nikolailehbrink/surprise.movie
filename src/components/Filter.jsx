import { useState } from "react";
import { fetchMovieDb, imageBase } from "../../helpers/movieDb";
import { useEffect } from "react";

export default function Filter() {
	const [providers, setProviders] = useState([]);
	const [selectProvider, setSelectProvider] = useState("");
	useEffect(() => {
		getMovieProviders();
	}, []);

	async function getMovieProviders() {
		try {
			const { results } = await fetchMovieDb(`watch/providers/movie`, {
				query: { watch_region: "US" },
			});
			console.log(results);
			const movieProviders = results
				.sort((a, b) => a.display_priority - b.display_priority)
				.slice(0, 10);
			setProviders(movieProviders);
		} catch (error) {
			console.log(error);
		}
	}
	return (
		<div className="grid grid-cols-5 self-start gap-3">
			{providers.map(({ provider_name, provider_id, logo_path }) => (
				<div key={provider_id}>
					<div className="grayscale hover:grayscale-0 transition-colors rounded border-2 border-white/25 hover:border-white p-2">
						<img
							className="rounded h-12"
							src={`${imageBase}original/${logo_path}`}
							alt={`Logo ${provider_name}`}
						/>
						{/* {provider_name} */}
					</div>
				</div>
			))}
			{/* <select
			className="text-black"
			onChange={(e) => setSelectProvider(e.target.value)}
			value={selectProvider}
            >
			<option value="all">Select Streaming Services</option>
		</select> */}
			{/* <select
			className="text-black"
			onChange={(e) => setSelectProvider(e.target.value)}
			value={selectProvider}
            >
			<option value="all">Select Streaming Services</option>
			{providers.map(({ provider_name, provider_id, logo_path }) => (
				<option value={provider_id} key={provider_id}>
					<img src={`imageBase${logo_path}`} alt={`Logo ${provider_name}`} />
					{provider_name}
				</option>
			))}
		</select> */}
		</div>
	);
}
