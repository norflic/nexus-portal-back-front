import {PanelLeftClose} from "lucide-react";
import {NavLink} from "react-router";
import Drawer, {type DrawerState} from "../Drawer/Drawer.tsx";
import "./SideBar.css";
import SideBarLinks from "./SideBarLinks.tsx";

type SideBarProps = {
    responsive?: {
        drawerState: DrawerState;
        setDrawerState: (state: DrawerState) => void;
    };
};

type _SideBarProps = {
    close?: () => void;
};

function _SideBar({ close }: _SideBarProps) {
    return (
        <div
            className="flex flex-col gap-2 bg-app-blue-darker text-xl py-4 text-white min-w-40 lg:w-[16vw] sticky top-0 left-0 h-screen">
            <div className="flex flex-row mr-4">
                {close && (
                    <div className="flex bg-app-blue-darker mb-auto mt-4 mr-0 p-2 text-white">
                        <PanelLeftClose
                            className="ml-auto mr-2"
                            onClick={close}
                            color="white"
                        />
                    </div>
                )}
                <NavLink
                    to="/"
                    className="flex flex-col gap-2 mb-8 p-2 exclude-link"
                >
                    <h1>Nexus portal</h1>
                    <span className="text-xs text-app-gray-dark">
                        Lien Entreprise
                    </span>
                </NavLink>
            </div>
            <SideBarLinks />
        </div>
    );
}

export default function SideBar({ responsive }: SideBarProps) {
    if (responsive) {
        return (
            <Drawer
                drawerState={responsive.drawerState}
                setDrawerState={responsive.setDrawerState}
            >
                <_SideBar close={() => responsive.setDrawerState("closing")} />
            </Drawer>
        );
    }

    return <_SideBar />;
}
