export type MovieDetails = {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: null;
  budget: number;
  genres: Genre[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  videos: Videos;
  images: Images;
  "watch/providers": WatchProviders;
  credits: Credits;
  release_dates: ReleaseDates;
};

export type Credits = {
  cast: ProductionPersonnel[];
  crew: ProductionPersonnel[];
};

export type ProductionPersonnel = {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: null | string;
  cast_id?: number;
  character?: string;
  credit_id: string;
  order?: number;
  department?: string;
  job?: string;
};

export type Genre = {
  id: number;
  name: string;
};

export type Images = {
  backdrops: Backdrop[];
  logos: unknown[];
  posters: Backdrop[];
};

export type Backdrop = {
  aspect_ratio: number;
  height: number;
  iso_639_1: string;
  file_path: string;
  vote_average: number;
  vote_count: number;
  width: number;
};

export type ProductionCompany = {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
};

export type ProductionCountry = {
  iso_3166_1: string;
  name: string;
};

export type ReleaseDates = {
  results: ReleaseDatesResult[];
};

export type ReleaseDatesResult = {
  iso_3166_1: string;
  release_dates: ReleaseDate[];
};

export type ReleaseDate = {
  certification: string;
  descriptors: unknown[];
  iso_639_1: string;
  note: string;
  release_date: string;
  type: number;
};

export type SpokenLanguage = {
  english_name: string;
  iso_639_1: string;
  name: string;
};

export type Videos = {
  results: VideosResult[];
};

export type VideosResult = {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  published_at: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  id: string;
};

export type WatchProviders = {
  results: { [countryCode: string]: CountryDetails };
};

export type CountryDetails = {
  link: string;
  buy: StreamingProvider[];
  rent: StreamingProvider[];
  flatrate?: StreamingProvider[];
};

export type StreamingProvider = {
  logo_path: string;
  provider_id: number;
  provider_name: string;
  display_priority: number;
};
