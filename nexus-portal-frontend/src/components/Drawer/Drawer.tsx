import {type ReactNode, useEffect, useState} from "react";

export type DrawerState = "opening" | "open" | "closing" | "closed";

type DrawerProps = {
    children: ReactNode;
    drawerState: DrawerState;
    setDrawerState: (state: DrawerState) => void;
    className?: string;
};

export default function Drawer({
    children,
    drawerState,
    setDrawerState,
    className = "",
}: DrawerProps) {
    const [maxWidth, setMaxWidth] = useState<string>("max-w-0");
    const onAnimationEnd = () => {
        if (drawerState == "opening") setDrawerState("open");
        else if (drawerState == "closing") setDrawerState("closed");
    };

    useEffect(() => {
        if (drawerState == "opening") setMaxWidth("max-w-full");
        else if (drawerState == "closing") setMaxWidth("max-w-0");
    }, [drawerState]);

    return (
        drawerState != "closed" && (
            <div
                className="fixed top-0 left-0 w-screen h-screen bg-[rgba(0,0,0,0.5)] z-50"
                onClick={(event) => {
                    setDrawerState("closing");
                    event.stopPropagation();
                }}
            >
                <div
                    className={`transition-[max-width] w-100 sticky h-full duration-120 flex flex-col overflow-hidden text-nowrap ${className} ${maxWidth}`}
                    onAnimationEnd={onAnimationEnd}
                    onTransitionEnd={onAnimationEnd}
                >
                    {children}
                </div>
            </div>
        )
    );
}
