import { Separator } from "@/components/ui/separator";
import { BaseLayout } from "@/layouts/base-layout";
import { SelectedUserProvider } from "@/providers/selected-user-provider";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { faker } from "@faker-js/faker";
import { useTask } from "@/hooks/use-task";
import { useToast } from "@/components/ui/use-toast";
import { AzureUserAdapter } from "@/api/azure/AzureUserAdapter";
import { User } from "@/types/User";

const profileFormSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .max(30, {
      message: "Username must not be longer than 30 characters.",
    }),
  avatarImage: z.string(),
});

type SettingFormValues = z.infer<typeof profileFormSchema>;

export const UpdateUser = () => {
  const { user, setUser } = SelectedUserProvider.useSelectedUser();

  const { toast } = useToast();

  const defaultValues: Partial<SettingFormValues> = {
    username: user?.username,
    avatarImage: user?.avatarImage,
  };

  const form = useForm<SettingFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  });

  const updateUserTask = useTask(async () => {
    try {
      if (!form.formState.isValid) return;

      const values = form.getValues();

      const adapter = new AzureUserAdapter();

      const newUserData: User = adapter.parser({ ...user, ...values });

      await adapter.put(newUserData);

      setUser(newUserData);

      toast({
        title: "User updated!",
        description: "Your user settings have been updated.",
      });
    } catch (err) {
      console.log(err);
      toast({
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
    }
  });

  return (
    <BaseLayout>
      <div className="space-y-6 w-full flex flex-col max-w-[1280px] items-start py-40">
        <div>
          <h3 className="text-lg font-medium">User Settings</h3>

          <p className="text-sm text-muted-foreground">
            Manage your account settings.
          </p>
        </div>

        <Separator />

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(() => updateUserTask.perform())}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="avatarImage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Avatar</FormLabel>

                  <FormControl>
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage alt="Avatar" src={field.value} />
                        <AvatarFallback>
                          {user?.username.slice(0, 2).toUpperCase() || "?"}
                        </AvatarFallback>
                      </Avatar>

                      <Button
                        type="button"
                        onClick={() => {
                          form.setValue("avatarImage", faker.image.avatar());
                        }}
                        variant="outline"
                      >
                        Shuffle Avatar
                      </Button>
                    </div>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>

                  <FormControl>
                    <Input placeholder="Enter your username..." {...field} />
                  </FormControl>

                  <FormDescription>
                    This is your public display name. It can be your real name
                    or a pseudonym. You can only change this once every 30 days.
                  </FormDescription>

                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              disabled={updateUserTask.isRunning || !form.formState.isValid}
              className="mt-10"
            >
              {updateUserTask.isRunning && (
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
              )}
              Save Changes
            </Button>
          </form>
        </Form>
      </div>
    </BaseLayout>
  );
};
