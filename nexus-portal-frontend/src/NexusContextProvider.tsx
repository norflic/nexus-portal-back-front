import {createContext, type ReactNode, type SetStateAction, useState,} from "react";
import type {User} from "./models/User";

type NexusContextProviderType = {
    children: ReactNode;
};

type AppContextValues = {
  user: User | null;
};

type AppContext = AppContextValues & {
  setContext: React.Dispatch<SetStateAction<AppContextValues>>;
};

export const NexusContext = createContext<AppContext>({
  user: null,
  setContext: () => {},
});

export default function NexusContextProvider({
  children,
}: NexusContextProviderType) {
  const [context, setContext] = useState<AppContextValues>(() => {
    const stored = localStorage.getItem("nexus-user");
      let parsedUser: User | null = null;

      if (stored) {
          try {
              parsedUser = JSON.parse(stored) as User;
          } catch (error) {
              console.warn("[Nexus FE] invalid localStorage user, clearing it:", error);
              localStorage.removeItem("nexus-user");
          }
      }
    return {
        user: parsedUser,
    };
  });

  const setContextWithStorage: React.Dispatch<
    SetStateAction<AppContextValues>
  > = (action) => {
    setContext((prev) => {
      const next = typeof action === "function" ? action(prev) : action;

      if (next.user) {
        localStorage.setItem("nexus-user", JSON.stringify(next.user));
      } else {
        localStorage.removeItem("nexus-user");
      }

      return next;
    });
  };

  const baseContext = { ...context, setContext: setContextWithStorage };

  return <NexusContext value={baseContext}>{children}</NexusContext>;
}
