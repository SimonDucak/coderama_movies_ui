import { parseNumber, tryParseNumber } from "@/utils/parsers";
import { isObject } from "@/utils/typeof";
import { AzureBaseAdapter } from "@/api/azure/AzureBaseAdapter";
import { FavouriteMovie, Movie } from "@/types/Movie";
import { QueryBuilder } from "@/utils/QueryBuilder";

export class AzureFavouriteMovieAdapter extends AzureBaseAdapter<FavouriteMovie> {
    get model() {
        return "FavouriteMovie";
    }

    public buildUrl(queryBuilder: QueryBuilder | null = null): string {
        const query = queryBuilder?.toString() ?? '';
        return `${this.host}/${this.model}/${this.userId}${query}`;
    }

    parser(record: unknown): FavouriteMovie {
        if (!isObject(record)) throw new Error("Expected an object");
        return {
            id: tryParseNumber(record.id),
            title: String(record.title),
            year: tryParseNumber(record.year),
            imdbID: String(record.imdbID),
            type: String(record.type),
            poster: String(record.poster),
            user: parseNumber(record.user),
        };
    }

    public async getImdbIds(): Promise<string[]> {
        const url = this.buildUrl();

        const response = await fetch(`${url}/imdb-ids`);

        const data = await this.parseResponse(response);

        if (!Array.isArray(data)) {
            throw new Error('Expected an array of numbers');
        }

        return data.map((record: unknown) => String(record));
    }

    public async post(movie: Movie) {
        const favouriteMovie = { ...movie, id: null, user: this.userId };
        
        const url = this.buildUrl();

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: this.serialize(favouriteMovie),
        });

        this.handleResponse(response);
    }

    public async delete(imdbId: string) {
        const url = this.buildUrl();

        const response = await fetch(`${url}/${imdbId}`, {
            method: "DELETE",
        });

        this.handleResponse(response);
    }

    constructor(public userId: number) {
        super();
    }
}