import { ThemeProvider } from "@/providers/theme-provider";
import {
  Route,
  BrowserRouter as Router,
  Routes,
  Navigate,
} from "react-router-dom";
import { RouteName, getPathDefinition, getRoutePath } from "@/routes";
import { Users } from "@/pages/users";
import { Movies } from "@/pages/movies";
import { Toaster } from "@/components/ui/toaster";
import { ApplicationProvider } from "@/providers/application-provider";
import { PrivateRoutes, ScrollToTop } from "@/router-helpers";
import { UpdateUser } from "@/pages/update-user";
import { MyFavourites } from "./pages/my-favourites";
import { MovieDetail } from "./pages/movie-detail";
import { SearchMovies } from "./pages/search-movies";

function App() {
  const { theme } = ThemeProvider.useTheme();

  return (
    <ThemeProvider defaultTheme={theme} storageKey="vite-ui-theme">
      <ApplicationProvider>
        <main className="relative flex min-h-screen flex-col bg-background">
          <Router>
            <ScrollToTop />

            <Routes>
              <Route element={<PrivateRoutes />}>
                <Route
                  path={getPathDefinition(RouteName.MOVIES)}
                  element={<Movies />}
                />

                <Route
                  path={getPathDefinition(RouteName.MY_FAVOURITES)}
                  element={<MyFavourites />}
                />

                <Route
                  path={getPathDefinition(RouteName.UPDATE_USER)}
                  element={<UpdateUser />}
                />

                <Route
                  path={getPathDefinition(RouteName.MOVIE_DETAILS)}
                  element={<MovieDetail />}
                />

                <Route
                  path={getPathDefinition(RouteName.SEARCH_MOVIES)}
                  element={<SearchMovies />}
                />
              </Route>

              <Route
                path={getPathDefinition(RouteName.USERS)}
                element={<Users />}
              />

              <Route
                path="*"
                element={
                  <Navigate to={getRoutePath(RouteName.USERS)} replace />
                }
              />
            </Routes>
          </Router>

          <Toaster />
        </main>
      </ApplicationProvider>
    </ThemeProvider>
  );
}

export default App;
