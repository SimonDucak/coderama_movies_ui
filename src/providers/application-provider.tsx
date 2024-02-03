import { User } from "@/types/User";
import { createContext, useContext, useState } from "react";

type ApplicationProps = {
  children: React.ReactNode;
};

type ApplicationState = {
  user: User | null;
  favouriteMoviesIds: string[];
  setUser: (user: User | null) => void;
  setFavouriteMoviesIds: (ids: string[]) => void;
  toggleFavouriteMovie: (id: string) => void;
  containsFavouriteMovie: (id: string) => boolean;
};

const initialState: ApplicationState = {
  user: null,
  favouriteMoviesIds: [],
  setUser: () => null,
  setFavouriteMoviesIds: () => null,
  toggleFavouriteMovie: () => null,
  containsFavouriteMovie: () => false,
};

const ApplicationContext = createContext<ApplicationState>(initialState);

export function ApplicationProvider({ children }: ApplicationProps) {
  const [user, setUser] = useState<User | null>(null);

  const [favouriteMoviesIds, setFavouriteMoviesIds] = useState<string[]>([]);

  const containsFavouriteMovie = (id: string) =>
    favouriteMoviesIds.includes(id);

  const toggleFavouriteMovie = (id: string) => {
    if (containsFavouriteMovie(id)) {
      setFavouriteMoviesIds((prev) => prev.filter((movieId) => movieId !== id));
    } else {
      setFavouriteMoviesIds((prev) => [...prev, id]);
    }
  };

  const value = {
    user,
    favouriteMoviesIds,
    setUser,
    setFavouriteMoviesIds,
    toggleFavouriteMovie,
    containsFavouriteMovie,
  };

  return (
    <ApplicationContext.Provider value={value}>
      {children}
    </ApplicationContext.Provider>
  );
}

ApplicationProvider.useApplication = () => {
  const context = useContext(ApplicationContext);

  if (!context) {
    throw new Error("useApplication must be used within a ApplicationProvider");
  }

  return context;
};
