export interface TheMovieDBInterface {
	page: number;
	results: MovieSearchInterface[];
	total_pages: number;
	total_results: number;
}

export interface MovieSearchInterface {
	adult: boolean;
	backdrop_path: string;
	id: number;
	title: string;
	original_language: string;
	original_title: string;
	overview: string;
	poster_path: string;
	media_type: MediaTypeInterface;
	genre_ids: number[];
	popularity: number;
	release_date: Date;
	video: boolean;
	vote_average: number;
	vote_count: number;
}

export interface MovieInterface {
	adult: boolean;
	backdrop_path: string;
	belongs_to_collection: null;
	budget: number;
	genres: GenresInterface[];
	homepage: string;
	id: number;
	imdb_id: string;
	original_language: string;
	original_title: string;
	overview: string;
	popularity: number;
	poster_path: null;
	production_companies: ProductionCompanyInterface[];
	production_countries: ProductionCountryInterface[];
	release_date: Date;
	revenue: number;
	runtime: number;
	spoken_languages: SpokenLanguageInterface[];
	status: string;
	tagline: string;
	title: string;
	video: boolean;
	vote_average: number;
	vote_count: number;
}

export enum MediaTypeInterface {
	MOVIE = 'movie',
}

export interface CategoriesInterface {
	genres: GenresInterface[];
}

export interface GenresInterface {
	id: number;
	name: string;
}

export interface MoviesByCategoryInterface {
	page: number;
	results: MovieSearchInterface[];
	total_results: number;
	total_pages: number;
}

export enum OriginalLanguage {
	EN = 'en',
}

export interface ProductionCompanyInterface {
	id: number;
	logo_path: null | string;
	name: string;
	origin_country: string;
}

export interface ProductionCountryInterface {
	iso_3166_1: string;
	name: string;
}

export interface SpokenLanguageInterface {
	iso_639_1: string;
	name: string;
}
