import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Skeleton } from "../ui/skeleton";

export type CoderamaCarouselProps = {
  children: React.ReactNode;
};

export function CoderamaCarousel({ children }: CoderamaCarouselProps) {
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full mb-16"
    >
      <CarouselContent>{children}</CarouselContent>

      <CarouselPrevious />

      <CarouselNext />
    </Carousel>
  );
}

export const CoderamaCarouselSkeleton = () => {
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full py-5"
    >
      <CarouselContent>
        {Array.from({ length: 8 }).map((_, index) => (
          <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/4">
            <div className="p-1">
              <Card>
                <CardContent className="relative flex h-[420px] items-center justify-center p-6">
                  <Skeleton className="h-12 w-12 rounded-full" />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};
