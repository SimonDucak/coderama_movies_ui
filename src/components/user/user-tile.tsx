import { User } from "@/types/User";
import { Card, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ChevronRightIcon, ReloadIcon } from "@radix-ui/react-icons";
import { Skeleton } from "@/components/ui/skeleton";
import { useTask } from "@/hooks/use-task";

export type UserTileProps = {
  user: User;
  onClick: (user: User) => Promise<void>;
};

export const UserTile = ({ user, onClick }: UserTileProps) => {
  const { isRunning, perform } = useTask(onClick);

  return (
    <Card
      onClick={() => {
        if (!isRunning) perform(user);
      }}
      className="w-full max-w-[400px] cursor-pointer transition-all duration-300 hover:border-foreground group"
    >
      <CardHeader className="flex w-full justify-between flex-row items-center">
        <div className="flex items-center space-x-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src={user.avatarImage} alt="Image" />
            <AvatarFallback>
              {user.username.slice(0, 2).toUpperCase() || "?"}
            </AvatarFallback>
          </Avatar>

          <div>
            <p className="text-sm font-medium leading-none">{user.username}</p>

            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
        </div>

        <Button
          size="icon"
          variant="outline"
          className="ml-4 rounded-full group-hover:bg-accent"
        >
          {isRunning ? (
            <ReloadIcon className="h-4 w-4 animate-spin" />
          ) : (
            <ChevronRightIcon className="h-4 w-4" />
          )}

          <span className="sr-only">New message</span>
        </Button>
      </CardHeader>
    </Card>
  );
};

export const UserTileSkeleton = () => {
  return (
    <div className="w-full max-w-[400px] flex items-center space-x-4 border p-6 rounded-xl">
      <Skeleton className="h-12 w-12 rounded-full" />

      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  );
};
