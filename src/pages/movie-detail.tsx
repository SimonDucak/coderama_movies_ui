import { useMovieApi } from "@/api/use-movie-api";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/use-toast";
import { useTask } from "@/hooks/use-task";
import { BaseLayout } from "@/layouts/base-layout";
import { FullMovie } from "@/types/Movie";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const MovieDetail = () => {
  const { id } = useParams();

  const { toast } = useToast();

  const [movie, setMovie] = useState<FullMovie | null>(null);

  const { getFullMovie } = useMovieApi();

  const loadDetailsTask = useTask(async () => {
    try {
      if (!id) return;

      const foundMovie = await getFullMovie(id);

      setMovie(foundMovie);
    } catch (err) {
      toast({
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
    }
  });

  useEffect(() => {
    loadDetailsTask.perform();
  }, []);

  return (
    <BaseLayout>
      {!loadDetailsTask.isRunning && (
        <div className="w-full flex max-w-[1280px] items-start pt-40 pb-20">
          <div className="shrink-0 rounded-xl overflow-hidden">
            <img
              style={{ objectFit: "cover" }}
              className="w-[300px] h-[400px]"
              src={movie?.poster}
              alt={movie?.title}
            />
          </div>

          <div className="flex w-full pl-8 flex-col">
            <h2 className="text-4xl font-bold mb-3">{movie?.title}</h2>

            <div className="flex items-center space-x-2">
              <Badge className="mb-3">IMDB {movie?.imdbRating}</Badge>

              <Badge className="mb-3">Votes {movie?.imdbVotes}</Badge>
            </div>

            <p className="text-muted-foreground mb-4">{movie?.plot}</p>

            <p className="text-sm text-muted-foreground mb-4">
              {movie?.year} | {movie?.genre} | {movie?.language} |{" "}
              {movie?.runtime}
            </p>

            <p className="text-muted-foreground mb-4">{movie?.actors}</p>
          </div>
        </div>
      )}

      {loadDetailsTask.isRunning && (
        <div className="w-full flex max-w-[1280px] items-start pt-40 pb-20">
          <div className="shrink-0 rounded-xl overflow-hidden">
            <Skeleton className="w-[300px] h-[400px]" />
          </div>

          <div className="flex w-full pl-8 flex-col">
            <Skeleton className="text-4xl h-8 font-bold mb-3" />

            <Skeleton className="h-4 mb-2 w-5/6" />
            <Skeleton className="h-4 mb-2 w-2/3" />
            <Skeleton className="h-4 mb-2 w-3/4" />
            <Skeleton className="h-4 w-full mb-6" />

            <Skeleton className="text-muted-foreground h-3 w-1/3 mb-4" />

            <Skeleton className="text-sm text-muted-foreground w-1/2  h-3 mb-4" />

            <Skeleton className="text-muted-foreground w-1/4 h-3 mb-4" />
          </div>
        </div>
      )}
    </BaseLayout>
  );
};
