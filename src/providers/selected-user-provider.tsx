import { User } from "@/types/User";
import { createContext, useContext, useState } from "react";

type SelectedUserProps = {
  children: React.ReactNode;
};

type SelectedUserState = {
  user: User | null;
  setUser: (user: User | null) => void;
};

const initialState: SelectedUserState = {
  user: null,
  setUser: () => null,
};

export const SelectedUserContext =
  createContext<SelectedUserState>(initialState);

export function SelectedUserProvider({ children }: SelectedUserProps) {
  const [user, setUser] = useState<User | null>(null);

  const value = {
    user,
    setUser,
  };

  return (
    <SelectedUserContext.Provider value={value}>
      {children}
    </SelectedUserContext.Provider>
  );
}

SelectedUserProvider.useSelectedUser = () => {
  const context = useContext(SelectedUserContext);

  if (!context) {
    throw new Error(
      "useSelectedUser must be used within a SelectedUserProvider"
    );
  }

  return context;
};
