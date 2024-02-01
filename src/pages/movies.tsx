import { CoderamaCarousel } from "@/components/base/carousel";
import { BaseLayout } from "@/layouts/base-layout";

export const Movies = () => {
  return (
    <BaseLayout>
      <div className="w-full h-[65vh] flex items-center justify-center">
        <div className="max-w-[1280px] w-full h-full py-10">
          <h2 className="mb-5 text-3xl font-extrabold tracking-tight lg:text-4xl">
            Movie of the day
          </h2>
        </div>
      </div>

      <div className="max-w-[1280px] w-full h-full py-10">
        <h2 className="text-3xl font-extrabold tracking-tight lg:text-4xl">
          Top 10 Movies in Slovakia Today
        </h2>

        <CoderamaCarousel />

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
      </div>
    </BaseLayout>
  );
};
