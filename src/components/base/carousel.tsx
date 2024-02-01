import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "../ui/button";
import { HeartIcon } from "@radix-ui/react-icons";

export function CoderamaCarousel() {
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full py-5"
    >
      <CarouselContent>
        {Array.from({ length: 20 }).map((_, index) => (
          <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/4">
            <div className="p-1">
              <Card>
                <CardContent className="relative flex aspect-video items-center justify-center p-6">
                  <span className="text-3xl font-semibold">{index + 1}</span>

                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2"
                  >
                    <HeartIcon className="h-5 w-5" />
                  </Button>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>

      <CarouselPrevious />

      <CarouselNext />
    </Carousel>
  );
}
