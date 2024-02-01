import { Footer } from "@/components/base/footer";
import { NavigationBar } from "@/components/base/navigation-bar";

export type BaseLayoutProps = {
  children: React.ReactNode;
};

export const BaseLayout = ({ children }: BaseLayoutProps) => {
  return (
    <section className="min-h-screen flex flex-col pt-[60px] items-center">
      <NavigationBar />

      {children}

      <Footer />
    </section>
  );
};
