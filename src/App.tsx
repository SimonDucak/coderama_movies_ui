import { ThemeProvider } from "@/providers/theme-provider";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { RouteName, getPathDefinition } from "@/routes";
import { Users } from "@/pages/users";
import { Movies } from "@/pages/movies";
import { Toaster } from "@/components/ui/toaster";
import { SelectedUserProvider } from "./providers/selected-user-provider";
import PrivateRoutes from "./private-routes";

function App() {
  const { theme } = ThemeProvider.useTheme();

  return (
    <ThemeProvider defaultTheme={theme} storageKey="vite-ui-theme">
      <SelectedUserProvider>
        <main className="relative flex min-h-screen flex-col bg-background">
          <Router>
            <Routes>
              <Route element={<PrivateRoutes />}>
                <Route
                  path={getPathDefinition(RouteName.MOVIES)}
                  element={<Movies />}
                />
              </Route>

              <Route
                path={getPathDefinition(RouteName.USERS)}
                element={<Users />}
              />
            </Routes>
          </Router>

          <Toaster />
        </main>
      </SelectedUserProvider>
    </ThemeProvider>
  );
}

export default App;
