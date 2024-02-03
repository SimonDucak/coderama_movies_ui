export type QueryParam = {
    key: string;
    value: string;
}

export class QueryBuilder {
    private _params: QueryParam[] = [];

    public addParam(key: string, value: string): QueryBuilder {
        this._params.push({ key, value });
        return this;
    }

    public removeParam(key: string): QueryBuilder {
        this._params = this._params.filter(param => param.key !== key);
        return this;
    }

    public addPagination(pageNumber: number = 1, pageSize: number = 10): QueryBuilder {
        this.addParam('pageNumber', pageNumber.toString());
        this.addParam('pageSize', pageSize.toString());
        return this;
    }

    public toString(): string {
        let query = "?";
        this._params.forEach(param => {
            query += `${param.key}=${param.value}&`;
        });
        return query.slice(0, -1);
    } 
}