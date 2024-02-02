import { Button } from "@/components/ui/button";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { UserTile, UserTileSkeleton } from "@/components/user/user-tile";
import { useTask } from "@/hooks/use-task";
import { SelectedUserProvider } from "@/providers/selected-user-provider";
import { RouteName, getRoutePath } from "@/routes";
import { User } from "@/types/User";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Transition } from "@/components/base/transition";
import { AzureUserAdapter } from "@/api/azure/AzureUserAdapter";

export const Users = () => {
  const navigate = useNavigate();

  const { setUser } = SelectedUserProvider.useSelectedUser();

  const { toast } = useToast();

  const [users, setUsers] = useState<User[]>([]);

  const fetchUsersTask = useTask(async () => {
    try {
      const foundUsers = await new AzureUserAdapter().getRecords();

      setUsers(foundUsers);
    } catch (err) {
      console.log(err);
      toast({
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
        action: (
          <ToastAction
            onClick={() => fetchUsersTask.perform()}
            altText="Try again"
          >
            Try again
          </ToastAction>
        ),
      });
    }
  });

  useEffect(() => {
    fetchUsersTask.perform();
  }, []);

  const forceError = () => {
    try {
      throw Error("This is a test error");
    } catch (err) {
      toast({
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
        action: (
          <ToastAction
            onClick={() => fetchUsersTask.perform()}
            altText="Try again"
          >
            Try again
          </ToastAction>
        ),
      });
    }
  };

  const openMovies = (selectedUser: User) => {
    setUser(selectedUser);
    navigate(getRoutePath(RouteName.MOVIES));
  };

  return (
    <section className="min-h-screen px-4 py-20 flex flex-col justify-center items-center">
      <div
        className="absolute top-0 pointer-events-none left-0 w-screen h-screen bg-cover bg-center bg-no-repeat opacity-5 z-0"
        style={{ backgroundImage: "url(/users-bg.jpg)" }}
      ></div>

      <Transition translateBottom={true}>
        <h1 className="mb-5 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Who's watching?
        </h1>
      </Transition>

      <Transition translateBottom={true}>
        <p className="leading-7 text-muted-foreground mb-12 [&:not(:first-child)]:mt-6">
          Select a profile to watch on Coderama.
        </p>
      </Transition>

      <div className="flex flex-col w-full justify-center items-center space-y-4">
        {!fetchUsersTask.isRunning &&
          users.map((user) => (
            <UserTile
              key={user.id}
              user={user}
              onClick={() => openMovies(user)}
            />
          ))}

        {fetchUsersTask.isRunning &&
          Array.from({ length: 4 }).map((_, index) => (
            <UserTileSkeleton key={index} />
          ))}
      </div>

      <Button
        variant="destructive"
        size="sm"
        className="fixed right-2 top-2"
        onClick={forceError}
      >
        FORCE ERROR
      </Button>
    </section>
  );
};
