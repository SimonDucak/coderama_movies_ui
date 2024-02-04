import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";

type FooterLinkProps = {
  label: string;
};

const FooterLink = ({ label }: FooterLinkProps) => {
  return (
    <a
      href="#"
      target="_blank"
      className="text-muted-foreground text-sm hover:underline hover:text-primary"
    >
      {label}
    </a>
  );
};

export const Footer = () => {
  return (
    <div className="w-full flex py-16 justify-center">
      <div className="w-full flex flex-col max-w-[1280px] px-2">
        <div className="flex items-center space-x-3 mb-10">
          <a
            href="https://github.com/SimonDucak/coderama_movies_ui"
            target="_blank"
          >
            <Button variant="outline" size="icon">
              <GitHubLogoIcon className="h-4 w-4" />
            </Button>
          </a>

          <h4 className="scroll-m-20 tracking-tight mr-20">Coderama Movies</h4>
        </div>

        <div className="flex flex-col lg:flex-row space-y-2 lg:space-x-5">
          <FooterLink label="About" />
          <FooterLink label="Contact" />
          <FooterLink label="Terms of Service" />
          <FooterLink label="Privacy Policy" />
          <FooterLink label="FAQ" />
        </div>

        <p className="mt-10 text-sm text-muted-foreground">
          © {new Date().getFullYear()} Coderama, Inc. All rights reserved.
        </p>
      </div>
    </div>
  );
};
