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