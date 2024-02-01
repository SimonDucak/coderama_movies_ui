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
import { SelectedUserProvider } from "@/providers/selected-user-provider";

type NavigationListItemProps = {
  label: string;
  routeName: RouteName;
};

const NavigationListItem = ({ label, routeName }: NavigationListItemProps) => {
  const isSelected = useMatch(getPathDefinition(routeName).replace("*", ""));

  return (
    <li
      className={`cursor-pointer text-sm ${
        isSelected ? "text-primary" : "text-muted-foreground"
      } hover:text-primary duration-100 transition-all`}
    >
      {label}
    </li>
  );
};

export const NavigationBar = () => {
  const navigate = useNavigate();

  const { user } = SelectedUserProvider.useSelectedUser();

  return (
    <nav className="px-4 z-50 bg-background flex justify-center h-[60px] w-screen border-b fixed top-0">
      <div className="max-w-[1280px] w-full h-full flex justify-between items-center">
        <div className="flex items-center">
          <h4 className="scroll-m-20 font-semibold tracking-tight mr-20 text-muted-foreground">
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
          <Button variant="outline" className="w-[350px] flex justify-start">
            <MagnifyingGlassIcon className="h-5 w-5 mr-2 text-muted-foreground" />
            <span className="text-muted-foreground">Search in Movies...</span>
          </Button>

          <Button variant="outline" size="icon">
            <GitHubLogoIcon className="h-4 w-4" />
          </Button>

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
                <DropdownMenuItem className="cursor-pointer">
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
