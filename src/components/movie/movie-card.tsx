import { Button } from "../ui/button";
import { HeartFilledIcon, HeartIcon, ReloadIcon } from "@radix-ui/react-icons";
import { Card, CardContent } from "@/components/ui/card";
import { Movie } from "@/types/Movie";
import { ApplicationProvider } from "@/providers/application-provider";
import { useTask } from "@/hooks/use-task";
import { useToast } from "../ui/use-toast";
import { AzureFavouriteMovieAdapter } from "@/api/azure/AzureFavouriteMovieAdapter";
import { useNavigate } from "react-router-dom";
import { RouteName, getRoutePath } from "@/routes";

export type MovieCardProps = {
  movie: Movie;
  height?: number;
};

export const MovieCard = ({ movie, height = 420 }: MovieCardProps) => {
  const { toast } = useToast();

  const navigate = useNavigate();

  const { containsFavouriteMovie, toggleFavouriteMovie, user } =
    ApplicationProvider.useApplication();

  const movieSelected = containsFavouriteMovie(movie.imdbID);

  const toggleFavouriteTask = useTask(async () => {
    try {
      if (toggleFavouriteTask.isRunning || !user) return;

      const adapter = new AzureFavouriteMovieAdapter(user.id);

      if (!movieSelected) await adapter.post(movie);
      else await adapter.delete(movie.imdbID);

      toggleFavouriteMovie(movie.imdbID);
    } catch (err) {
      toast({
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
    }
  });

  const getButtonIcon = () => {
    if (toggleFavouriteTask.isRunning)
      return <ReloadIcon className="h-5 w-5 animate-spin" />;
    if (movieSelected)
      return <HeartFilledIcon className="h-5 w-5 text-destructive" />;
    return <HeartIcon className="h-5 w-5" />;
  };

  return (
    <Card
      onClick={() =>
        navigate(getRoutePath(RouteName.MOVIE_DETAILS, { id: movie.imdbID }))
      }
      className="overflow-hidden"
    >
      <CardContent
        className={`p-0 m-0 relative cursor-pointer group flex h-[${height}px] items-center justify-center`}
      >
        <img
          className="w-full h-full object-fill group-hover:scale-105 transition-all duration-500"
          src={movie.poster}
          alt={movie.title}
        />

        <Button
          onClick={(e) => {
            e.stopPropagation();
            toggleFavouriteTask.perform();
          }}
          size="icon"
          className="absolute top-2 right-2"
        >
          {getButtonIcon()}
        </Button>
      </CardContent>
    </Card>
  );
};
