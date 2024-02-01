import { NavigationBar } from "@/components/base/navigation-bar";

export type BaseLayoutProps = {
  children: React.ReactNode;
};

export const BaseLayout = ({ children }: BaseLayoutProps) => {
  return (
    <section className="min-h-screen flex flex-col items-center">
      <NavigationBar />

      {children}
    </section>
  );
};
