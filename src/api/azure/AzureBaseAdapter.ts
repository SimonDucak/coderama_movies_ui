import { QueryBuilder } from "@/utils/QueryBuilder";

// Taky moj experiment s TypeScriptom na handlovanie Azure API. 
// Mohlo by sa to pouzit napr. na CRUD volania.
export abstract class AzureBaseAdapter<T extends { id: number | null }> {
    abstract get model(): string;

    abstract parser(record: unknown): T;

    public host: string = !process.env.NODE_ENV || process.env.NODE_ENV === 'development' ? 
        'http://localhost:5242/api' : 
        'https://api.azure.com/api';

    public buildUrl(queryBuilder: QueryBuilder | null = null): string {
        const query = queryBuilder?.toString() ?? '';
        return `${this.host}/${this.model}${query}`;
    }

    public async getRecords(queryBuilder: QueryBuilder = new QueryBuilder().addPagination(1, 10)): Promise<T[]> {
        const url = this.buildUrl(queryBuilder);

        const response = await fetch(url);

        const data = await this.parseResponse(response);

        if (!Array.isArray(data)) {
            throw new Error('Expected an array of records');
        }

        return data.map(this.parser);
    }

    public async parseResponse(response: Response): Promise<unknown> {
        this.handleResponse(response);

        const data = await response.json();

        return data;
    }

    public handleResponse(response: Response): void {
        if (response.status > 300) {
            throw new Error(response.statusText);
        }
    }

    public serialize(data: T): string {
        return JSON.stringify(data, (_key, value) => {
            if (value instanceof Date) {
                return value.toISOString();
            }
            return value;
        });
    }
}