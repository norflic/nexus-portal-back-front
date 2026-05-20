import { Outlet } from "react-router";
import "./App.css";
import Header from "./components/header/Header.tsx";
import SideBar from "./components/sideBar/SideBar.tsx";
import { useContext, useEffect, useState } from "react";
import type { DrawerState } from "./components/Drawer/Drawer.tsx";
import useMedia from "use-media";
import type { User } from "./models/User.ts";
import { NexusContext } from "./NexusContextProvider.tsx";

export type AppRouterContext = {
  setCurrentPage: (name: string) => void;
  isPageLarge: boolean; // 1024px
};

function App() {
    const [currentPage, setCurrentPage] = useState<string>("");
    const [drawerState, setDrawerState] = useState<DrawerState>("closed");
    const isLarge = useMedia({ minWidth: "1024px" });

    useEffect(() => {
        if (isLarge) setDrawerState("closed");
    }, [isLarge]);
    const user: User | null = useContext(NexusContext).user;

    const outletContext: AppRouterContext = {
        setCurrentPage,
        isPageLarge: isLarge,
    };

    return (
        <div className="flex flex-row min-h-screen w-full">
            {user ? (
                <>
                    <SideBar responsive={!isLarge ? { drawerState, setDrawerState } : undefined} />
                    <div className="flex flex-col flex-1">
                        <Header
                            currentPage={currentPage}
                            openDrawer={
                                !isLarge && drawerState == "closed"
                                    ? () => setDrawerState("opening")
                                    : undefined
                            }
                        />
                        <Outlet context={outletContext} />
                    </div>
                </>
            ) : (
                <div className="flex flex-col flex-1">
                    <Header currentPage={currentPage} />
                    <Outlet context={outletContext} />
                </div>
            )}
        </div>
    );
}

export default App;

