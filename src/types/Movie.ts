export type Movie = {
    title: string;
    year: number | null;
    imdbID: string;
    type: string;
    poster: string;
}

export type FavouriteMovie = Movie & {
    id: number | null;
    user: number;
} 

export type FullMovie = Movie & {
    actors: string | null;
    awards: string | null;
    boxOffice: string | null;
    country: string | null;
    DVD: string | null;
    director: string | null;
    genre: string | null;
    language: string | null;
    metascore: string | null;
    plot: string | null;
    released: string | null;
    runtime: string | null;
    imdbRating: string | null;  
    imdbVotes: string | null;
}