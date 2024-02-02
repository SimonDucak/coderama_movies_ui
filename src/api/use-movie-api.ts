import { QueryBuilder } from "@/utils/QueryBuilder";
import { tryParseNumber } from "@/utils/parsers";
import { isObject } from "@/utils/typeof";

export type Movie = {
    title: string;
    year: number | null;
    imdbID: string;
    type: string;
    poster: string;
}

export const useMovieApi = () => {
    const apiKey = "cba778d7";

    const baseUrl = "http://www.omdbapi.com/";

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

    const parseResponse = async (response: Response) => {
        if (response.status > 300) {
            throw new Error(response.statusText);
        }

        return await response.json();
    };

    const getMovies = async (queryBuilder: QueryBuilder): Promise<{ totalResults: number | null, movies: Movie[] }> => {
        const query = queryBuilder
            .addParam("apikey", apiKey)
            .toString();

        const response = await fetch(baseUrl + query);
        
        const data = await parseResponse(response);

        if (!Array.isArray(data.Search)) throw Error("Expected an array of movies");

        return {
            movies: data.Search.map(parseMovie),
            totalResults: tryParseNumber(data.totalResults),
        }
    }

    return {
        getMovies,
    }
};