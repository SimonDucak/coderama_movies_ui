import { AzureFavouriteMovieAdapter } from "@/api/azure/AzureFavouriteMovieAdapter";
import { MovieCard } from "@/components/movie/movie-card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { BaseLayout } from "@/layouts/base-layout";
import { ApplicationProvider } from "@/providers/application-provider";
import { FavouriteMovie } from "@/types/Movie";
import { QueryBuilder } from "@/utils/QueryBuilder";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { debounce } from "lodash";

export const MyFavourites = () => {
  const { user, favouriteMoviesIds } = ApplicationProvider.useApplication();

  const { toast } = useToast();

  const [favouriteMovies, setFavouriteMovies] = useState<FavouriteMovie[]>([]);

  const pageSize = 16;

  const [pageNumber, setPageNumber] = useState(1);

  const [hasMore, setHasMore] = useState(true);

  const [isRunning, setIsRunning] = useState(false);

  const loadFavourites = async () => {
    try {
      if (!user || !hasMore || isRunning) return;

      setIsRunning(true);

      const queryBuilder = new QueryBuilder().addPagination(
        pageNumber,
        pageSize
      );

      const foundMovies = await new AzureFavouriteMovieAdapter(
        user.id
      ).getRecords(queryBuilder);

      if (foundMovies.length < pageSize) setHasMore(false);

      setPageNumber(pageNumber + 1);

      setFavouriteMovies([...favouriteMovies, ...foundMovies]);
    } catch (err) {
      toast({
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
    } finally {
      setIsRunning(false);
    }
  };

  const loadFavouritesDebounced = debounce(loadFavourites, 300);

  useEffect(() => {
    loadFavourites();
  }, []);

  return (
    <InfiniteScroll
      pageStart={1}
      initialLoad={false}
      loadMore={() => {
        loadFavouritesDebounced();
      }}
      hasMore={hasMore}
      loader={
        <div className="w-full flex justify-center items-center pb-40" key={0}>
          <Button variant="ghost">
            <ReloadIcon className="h-5 w-5 mr-5 animate-spin" />
            <span>Loading ...</span>
          </Button>
        </div>
      }
      useWindow={true}
    >
      <BaseLayout>
        <div className="space-y-6 px-4 w-full flex flex-col max-w-[1280px] items-start pt-40 pb-20">
          <div>
            <h2 className="text-4xl font-bold mb-2">My Favourites</h2>

            <p className="text-primary/70">
              Here you can find all the movies you have added to your favourites
              list. Enjoy!
            </p>
          </div>

          <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {favouriteMovies
              .filter((m) => favouriteMoviesIds.some((f) => f == m.imdbID))
              .map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
          </div>
        </div>
      </BaseLayout>
    </InfiniteScroll>
  );
};
