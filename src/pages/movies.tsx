import {
  CoderamaCarousel,
  CoderamaCarouselSkeleton,
} from "@/components/base/carousel";
import { Footer } from "@/components/base/footer";
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
          className="aspect-video w-full absolute top-0 left-0"
          autoPlay
          loop
          muted={muted}
        >
          <source src="dunkirk.mp4" />
        </video>

        <div className="max-w-[1280px] w-full h-full py-40 z-40">
          <h2 className="mb-23 text-lg tracking-wide text-primary/70 ">
            MOVIE OF THE DAY
          </h2>

          <h2 className="mb-5 text-6xl font-extrabold tracking">Dunkirk</h2>

          <div className="flex items-center space-x-2 mb-5">
            <Badge className="bg-transparent border text-primary border-primary hover:bg-transparent">
              Action
            </Badge>
            <Badge className="bg-transparent border text-primary border-primary hover:bg-transparent">
              Drama
            </Badge>
            <Badge className="bg-transparent border text-primary border-primary hover:bg-transparent">
              History
            </Badge>
          </div>

          <p className="text-primary/70 mb-10 w-full max-w-[450px] leading-7">
            Allied soldiers from Belgium, the British Commonwealth and Empire,
            and France are surrounded by the German Army and evacuated during a
            fierce battle in World War II.
          </p>

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
        <h2 className="text-3xl font-extrabold tracking-tight lg:text-4xl">
          Top 10 Movies in Slovakia Today
        </h2>

        <CoderamaCarouselSkeleton />

        <h2 className="text-3xl font-extrabold tracking-tight lg:text-4xl">
          New Releases
        </h2>

        <CoderamaCarousel />

        <h2 className="text-3xl font-extrabold tracking-tight lg:text-4xl">
          Top Searches
        </h2>

        <CoderamaCarousel />

        <h2 className="text-3xl font-extrabold tracking-tight lg:text-4xl">
          Trending Now
        </h2>

        <CoderamaCarousel />

        <Footer />
      </div>
    </BaseLayout>
  );
};
