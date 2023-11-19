import { ofetch } from "ofetch";

const { VITE_TMDB_API_KEY } = import.meta.env;

export const fetchMovieDb = ofetch.create({
	baseURL: "https://api.themoviedb.org/3",
	headers: {
		Authorization: `Bearer ${VITE_TMDB_API_KEY}`,
	},
	query: {
		language: navigator.language,
	},
});

export const imageConfig = {
	base_url: "http://image.tmdb.org/t/p/",
	secure_base_url: "https://image.tmdb.org/t/p/",
	backdrop_sizes: ["w300", "w780", "w1280", "original"],
	logo_sizes: ["w45", "w92", "w154", "w185", "w300", "w500", "original"],
	poster_sizes: ["w92", "w154", "w185", "w342", "w500", "w780", "original"],
	profile_sizes: ["w45", "w185", "h632", "original"],
	still_sizes: ["w92", "w185", "w300", "original"],
};

export const imageBase = imageConfig.secure_base_url;
