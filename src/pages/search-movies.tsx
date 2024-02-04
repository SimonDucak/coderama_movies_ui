import { useMovieApi } from "@/api/use-movie-api";
import { MovieCard } from "@/components/movie/movie-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useTask } from "@/hooks/use-task";
import { BaseLayout } from "@/layouts/base-layout";
import { Movie } from "@/types/Movie";
import { QueryBuilder } from "@/utils/QueryBuilder";
import { ReloadIcon } from "@radix-ui/react-icons";
import { debounce } from "lodash";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroller";

export const SearchMovies = () => {
  const { toast } = useToast();

  const [movies, setMovies] = useState<Movie[]>([]);

  const [pageNumber, setPageNumber] = useState(1);

  const [hasMore, setHasMore] = useState(true);

  const [searchQuery, setSearchQuery] = useState("");

  const pageSize = 10;

  const { getMovies: getMoviesOmd } = useMovieApi();

  const getMovies = async (value: string): Promise<Movie[]> => {
    try {
      const queryBuilder = new QueryBuilder()
        .addParam("s", value)
        .addParam("page", pageNumber.toString());

      const moviesResult = await getMoviesOmd(queryBuilder);

      setHasMore(moviesResult.movies.length === pageSize);

      setPageNumber(pageNumber + 1);

      return moviesResult.movies;
    } catch (err) {
      let title = "Uh oh! Something went wrong.";

      if (err instanceof Error) {
        title = err.message;
      }

      toast({
        title: title,
        description: "There was a problem with your request.",
      });
      return [];
    }
  };

  const searchTask = useTask(async (value: string) => {
    setSearchQuery(value);

    if (value.length < 3) return;

    setPageNumber(1);

    const foundMovies = await getMovies(value);

    setMovies(foundMovies);
  });

  const loadMoreTask = useTask(async () => {
    const foundMovies = await getMovies(searchQuery);

    setMovies([...movies, ...foundMovies]);
  });

  const searchTaskDebounced = debounce(searchTask.perform, 300);

  const loadMoreTaskDebounced = debounce(loadMoreTask.perform, 300);

  return (
    <InfiniteScroll
      pageStart={1}
      initialLoad={false}
      loadMore={() => {
        if (!searchTask.isRunning) loadMoreTaskDebounced();
      }}
      hasMore={hasMore}
      loader={
        loadMoreTask.isRunning ? (
          <div
            className="w-full flex justify-center items-center pb-40"
            key={0}
          >
            <Button variant="ghost">
              <ReloadIcon className="h-5 w-5 mr-5 animate-spin" />
              <span>Loading ...</span>
            </Button>
          </div>
        ) : (
          <div key={0}></div>
        )
      }
      useWindow={true}
    >
      <BaseLayout>
        <section className="py-40 px-4 w-full flex items-center justify-center">
          <div className="w-full max-w-[1280px] flex flex-col items-center">
            <Input
              className="w-full max-w-[640px] h-16 mb-12"
              placeholder="Search for a movie..."
              autoFocus={true}
              onChange={(e) => searchTaskDebounced(e.target.value)}
            />

            <div className="w-full grid grid-cols-5  gap-6">
              {movies.map((movie) => (
                <MovieCard key={movie.imdbID} movie={movie} height={350} />
              ))}
            </div>
          </div>
        </section>
      </BaseLayout>
    </InfiniteScroll>
  );
};
