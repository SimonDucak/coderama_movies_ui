export enum RouteName {
    USERS,
    UPDATE_USER,
    MOVIES,
    MOVIE_DETAILS,
    SEARCH_MOVIES,
    MY_FAVOURITES,
}

export const getPathDefinition = (routeName: RouteName): string => {
    switch (routeName) {
        case RouteName.USERS:
            return "/";
        case RouteName.UPDATE_USER:
            return "/user/update";
        case RouteName.MOVIES: 
            return "/movies";
        case RouteName.SEARCH_MOVIES:
            return "/search-movies";
        case RouteName.MOVIE_DETAILS:
            return "/movie-detail/:id";
        case RouteName.MY_FAVOURITES:
            return "/my-favourites";
    }
}

export const getRoutePath = (routeName: RouteName, params?: Record<string, string | number>): string => {
    let path = getPathDefinition(routeName);

    const containsColon = path.includes(":");

    if (!containsColon) return path;

    if (!params) throw new Error("Params must be provided");

    const keys = Object.keys(params);

    keys.forEach((key) => {
        path = path.replace(`:${key}`, params[key].toString());
    });

    return path;
}