import { Button } from "../ui/button";
import { HeartIcon } from "@radix-ui/react-icons";
import { Card, CardContent } from "@/components/ui/card";
import { Movie } from "@/api/use-movie-api";

export type MovieCardProps = {
  movie: Movie;
};

export const MovieCard = ({ movie }: MovieCardProps) => {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0 m-0 relative cursor-pointer group flex h-[420px] items-center justify-center">
        <img
          className="w-full h-full object-fill group-hover:scale-105 transition-all duration-500"
          src={movie.poster}
          alt={movie.title}
        />

        <Button
          variant="secondary"
          size="icon"
          className="absolute top-2 right-2"
        >
          <HeartIcon className="h-5 w-5" />
        </Button>
      </CardContent>
    </Card>
  );
};
