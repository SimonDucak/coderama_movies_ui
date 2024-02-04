import { FullMovie, Movie } from "@/types/Movie";
import { QueryBuilder } from "@/utils/QueryBuilder";
import { tryParseNumber } from "@/utils/parsers";
import { isObject } from "@/utils/typeof";

export const useMovieApi = () => {
    const apiKey = "cba778d7";

    const baseUrl = "https://www.omdbapi.com/";

    const parseMovie = (data: unknown): Movie => {
        const obj = isObject(data) ? data : {};
        return {
            title: String(obj.Title),
            year: tryParseNumber(obj.Year),
            imdbID: String(obj.imdbID),
            type: String(obj.Type),
            poster: String(obj.Poster),
        }
    };

    const parseFullMovie = (data: unknown): FullMovie => {
        const obj = isObject(data) ? data : {};
        const movie = parseMovie(obj);
        return {
            ...movie,
            actors: String(obj.Actors),
            awards: String(obj.Awards),
            boxOffice: String(obj.BoxOffice),
            country: String(obj.Country),
            DVD: String(obj.DVD),
            director: String(obj.Director),
            genre: String(obj.Genre),
            language: String(obj.Language),
            metascore: String(obj.Metascore),
            plot: String(obj.Plot),
            released: String(obj.Released),
            runtime: String(obj.Runtime),
            imdbRating: String(obj.imdbRating),
            imdbVotes: String(obj.imdbVotes),
        }
    }

    const parseResponse = async (response: Response) => {
        if (response.status > 300) {
            throw new Error(response.statusText);
        }

        return await response.json();
    };

    const getFullMovie = async (imdbId: string): Promise<FullMovie> => {
        const query = new QueryBuilder()
            .addParam("apikey", apiKey)
            .addParam("i", imdbId)
            .addParam("plot", "full");

        const response = await fetch(baseUrl + query.toString());

        const data = await parseResponse(response);

        return parseFullMovie(data);
    }

    const getMovies = async (queryBuilder: QueryBuilder): Promise<{ totalResults: number | null, movies: Movie[] }> => {
        const query = queryBuilder
            .addParam("apikey", apiKey)
            .toString();

        const response = await fetch(baseUrl + query);
        
        const data = await parseResponse(response);

        if (data.Error) throw Error(data.Error);

        if (!Array.isArray(data.Search)) throw Error("Expected an array of movies");

        return {
            movies: data.Search.map(parseMovie),
            totalResults: tryParseNumber(data.totalResults),
        }
    }

    return {
        getMovies,
        getFullMovie,
    }
};
