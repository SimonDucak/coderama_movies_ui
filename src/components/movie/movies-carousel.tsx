import { useMovieApi } from "@/api/use-movie-api";
import {
  CoderamaCarousel,
  CoderamaCarouselSkeleton,
} from "@/components/base/carousel";
import { useTask } from "@/hooks/use-task";
import { QueryBuilder } from "@/utils/QueryBuilder";
import { useToast } from "@/components/ui/use-toast";
import { useEffect, useState } from "react";
import { CarouselItem } from "@/components/ui/carousel";
import { MovieCard } from "@/components/movie/movie-card";
import { Movie } from "@/types/Movie";

export type MoviesCarouselProps = {
  title: string;
  searchQuery: string;
};

export const MoviesCarousel = ({ title, searchQuery }: MoviesCarouselProps) => {
  const { getMovies } = useMovieApi();

  const { toast } = useToast();

  const [movies, setMovies] = useState<Movie[]>([]);

  const getMoviesTask = useTask(async () => {
    try {
      const queryBuilder = new QueryBuilder().addParam("s", searchQuery);

      const moviesResult = await getMovies(queryBuilder);

      setMovies(moviesResult.movies);
    } catch (err) {
      toast({
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
    }
  });

  useEffect(() => {
    getMoviesTask.perform();
  }, []);

  return (
    <>
      <h2 className="text-3xl mb-6 font-extrabold tracking-tight lg:text-4xl">
        {title}
      </h2>

      {getMoviesTask.isRunning ? (
        <CoderamaCarouselSkeleton />
      ) : (
        <CoderamaCarousel>
          {movies.map((movie) => (
            <CarouselItem
              key={movie.imdbID}
              className="md:basis-1/2 lg:basis-1/4"
            >
              <MovieCard movie={movie} />
            </CarouselItem>
          ))}
        </CoderamaCarousel>
      )}
    </>
  );
};
