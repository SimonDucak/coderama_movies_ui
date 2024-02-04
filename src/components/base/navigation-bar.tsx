import { RouteName, getPathDefinition, getRoutePath } from "@/routes";
import { useMatch, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { GitHubLogoIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ApplicationProvider } from "@/providers/application-provider";
import { useScrollTop } from "@/hooks/use-scroll-top";

type NavigationListItemProps = {
  label: string;
  routeName: RouteName;
};

const NavigationListItem = ({ label, routeName }: NavigationListItemProps) => {
  const navigate = useNavigate();

  return (
    <li
      onClick={() => navigate(getRoutePath(routeName))}
      className="cursor-pointer text-sm duration-100 transition-all"
    >
      {label}
    </li>
  );
};

export const NavigationBar = () => {
  const navigate = useNavigate();

  const scrollTop = useScrollTop();

  const { user } = ApplicationProvider.useApplication();

  const isSearchPage = useMatch(getPathDefinition(RouteName.SEARCH_MOVIES));

  return (
    <nav className="px-4 z-50 flex justify-center h-[60px] w-screen fixed top-0 transition-all duration-50">
      <div className="w-full overflow-hidden h-full absolute top-0 left-0">
        <div
          className={`w-full h-full bg-background transition-all duration-200 ${
            scrollTop > 100 ? "-translate-y-0" : "-translate-y-full"
          }`}
        ></div>
      </div>

      <div className="max-w-[1280px] w-full h-full flex justify-between z-10 items-center">
        <div className="flex items-center">
          <h4 className="scroll-m-20 font-semibold tracking-tight mr-20 text-primary">
            <i>Coderama Movies</i>
          </h4>

          <ul className="flex flex-row space-x-5">
            <NavigationListItem label="Movies" routeName={RouteName.MOVIES} />

            <NavigationListItem
              label="My Favourites"
              routeName={RouteName.MY_FAVOURITES}
            />
          </ul>
        </div>

        <div className="flex flex-row space-x-4">
          {!isSearchPage && (
            <Button
              onClick={() => navigate(getRoutePath(RouteName.SEARCH_MOVIES))}
              variant="outline"
              className="w-[350px] flex justify-start"
            >
              <MagnifyingGlassIcon className="h-5 w-5 mr-2 text-muted-foreground" />
              <span className="text-muted-foreground">Search in Movies...</span>
            </Button>
          )}

          <a
            href="https://github.com/SimonDucak/coderama_movies_ui"
            target="_blank"
          >
            <Button variant="outline" size="icon">
              <GitHubLogoIcon className="h-4 w-4" />
            </Button>
          </a>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="h-9 w-9 cursor-pointer">
                <AvatarImage src={user?.avatarImage} alt="Image" />

                <AvatarFallback>
                  {(user?.username || "").slice(0, 2).toUpperCase() || "?"}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>

              <DropdownMenuSeparator />

              <DropdownMenuGroup>
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => navigate(getRoutePath(RouteName.UPDATE_USER))}
                >
                  Update Profile
                </DropdownMenuItem>

                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => navigate(getRoutePath(RouteName.USERS))}
                >
                  Change Account
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
};
