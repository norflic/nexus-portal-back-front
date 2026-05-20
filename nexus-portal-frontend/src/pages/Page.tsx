import {type ReactNode, useContext, useEffect} from "react";
import {useNavigate, useOutletContext} from "react-router";
import type {AppRouterContext} from "../App";
import {NexusContext} from "../NexusContextProvider";
import type {User} from "../models/User";

type PageProps = {
    name: string;
    children: ReactNode;
};

export default function Page({ name, children }: PageProps) {
    const user: User | null = useContext(NexusContext).user;
    const context = useOutletContext() as AppRouterContext;

    const navigate = useNavigate();

  useEffect(() => {
    if (!user && name !== "Login") {
      navigate({ pathname: "/login" });
    } else if (user && name === "Login") {
      //TODO CHANGE DAT
      navigate({ pathname: "/user/1" });
    }
  }, [user]);

    useEffect(() => {
        context.setCurrentPage(name);
    }, []);

    return <>{children}</>;
}
