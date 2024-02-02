import { Footer } from "@/components/base/footer";
import { MoviesCarousel } from "@/components/movie/movies-carousel";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BaseLayout } from "@/layouts/base-layout";
import { SpeakerLoudIcon, SpeakerOffIcon } from "@radix-ui/react-icons";
import { useState } from "react";

export const Movies = () => {
  const [muted, setMuted] = useState(false);

  return (
    <BaseLayout>
      <div className="w-full absolute top-0 left-0 h-[100vh] flex items-center bg-center bg-cover bg-no-repeat justify-center">
        <video
          className="w-full absolute top-0 left-0"
          autoPlay
          loop
          muted={muted}
        >
          <source src="batman.mp4" />
        </video>

        <div className="max-w-[1280px] w-full h-full py-40 z-40">
          <h2 className="mb-23 text-lg tracking-wide text-primary/70 ">
            MOVIE OF THE DAY
          </h2>

          <h2 className="mb-5 text-6xl font-extrabold tracking">
            The Dark Knight
          </h2>

          <div className="flex items-center space-x-2 mb-5">
            <Badge className="bg-transparent border text-primary border-primary hover:bg-transparent">
              Action
            </Badge>
            <Badge className="bg-transparent border text-primary border-primary hover:bg-transparent">
              Crime
            </Badge>
            <Badge className="bg-transparent border text-primary border-primary hover:bg-transparent">
              Drama
            </Badge>
          </div>

          <p className="text-primary/70 mb-4 w-full max-w-[450px] leading-7">
            When the menace known as the Joker wreaks havoc and chaos on the
            people of Gotham, Batman must accept one of the greatest
            psychological and physical tests of his ability to fight injustice.
          </p>

          <div className="text-primary/70 mb-10  w-full max-w-[450px] leading-7 text-xs">
            Acation | 2008 | 2hr 32min
          </div>

          <div className="flex items-center space-x-3">
            <Button
              size="lg"
              className="w-full max-w-[150px] bg-transparent border border-primary 
							text-primary shadow-none hover:bg-primary hover:text-primary-foreground transition-all"
            >
              More Info
            </Button>

            <Button
              className="w-10 h-10"
              onClick={() => setMuted(!muted)}
              size="icon"
              variant={muted ? "outline" : "default"}
            >
              {muted ? (
                <SpeakerOffIcon className="h-4 w-4" />
              ) : (
                <SpeakerLoudIcon className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-[1280px] relative top-[75vh] z-40 w-full h-full py-10">
        <MoviesCarousel
          title="Top 10 Movies in Slovakia Today"
          searchQuery="batman"
        />

        <MoviesCarousel title="New Releases" searchQuery="Blade" />

        <MoviesCarousel title="Top Searches" searchQuery="Hobbit" />

        <MoviesCarousel title="Trending Now" searchQuery="Lord" />

        <MoviesCarousel title="Recently Added" searchQuery="Marvel" />

        <Footer />
      </div>
    </BaseLayout>
  );
};
