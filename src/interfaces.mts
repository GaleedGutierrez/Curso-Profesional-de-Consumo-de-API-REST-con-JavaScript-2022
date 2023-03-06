export interface InterfaceTheMovieDB {
	page: number;
	results: InterfaceMovieSearch[];
	total_pages: number;
	total_results: number;
}

export interface InterfaceMovieSearch {
	adult: boolean;
	backdrop_path: string;
	id: number;
	title: string;
	original_language: string;
	original_title: string;
	overview: string;
	poster_path: string;
	media_type: EnumMediaType;
	genre_ids: number[];
	popularity: number;
	release_date: string;
	video: boolean;
	vote_average: number;
	vote_count: number;
}

export interface InterfaceMovie {
	adult: boolean;
	backdrop_path: string;
	belongs_to_collection: null;
	budget: number;
	genres: InterfaceGenres[];
	homepage: string;
	id: number;
	imdb_id: string;
	original_language: string;
	original_title: string;
	overview: string;
	popularity: number;
	poster_path: null;
	production_companies: InterfaceProductionCompany[];
	production_countries: InterfaceProductionCountry[];
	release_date: string;
	revenue: number;
	runtime: number;
	spoken_languages: InterfaceSpokenLanguage[];
	status: string;
	tagline: string;
	title: string;
	video: boolean;
	vote_average: number;
	vote_count: number;
}

export enum EnumMediaType {
	MOVIE = 'movie',
}

export interface InterfaceCategories {
	genres: InterfaceGenres[];
}

export interface InterfaceGenres {
	id: number;
	name: string;
}

export interface InterfaceMoviesByCategory {
	page: number;
	results: InterfaceMovieSearch[];
	total_results: number;
	total_pages: number;
}

export enum EnumOriginalLanguage {
	EN = 'en',
}

export interface InterfaceProductionCompany {
	id: number;
	logo_path: null | string;
	name: string;
	origin_country: string;
}

export interface InterfaceProductionCountry {
	iso_3166_1: string;
	name: string;
}

export interface InterfaceSpokenLanguage {
	iso_639_1: string;
	name: string;
}
