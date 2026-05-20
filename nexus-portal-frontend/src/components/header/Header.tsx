import {useContext} from "react";
import ProfileBadge from "../profile/ProfileBadge.tsx";
import {PanelLeftOpen} from "lucide-react";
import {NexusContext} from "../../NexusContextProvider.tsx";

type HeaderProps = {
    currentPage: string;
    openDrawer?: () => void;
};

export default function Header({currentPage, openDrawer}: HeaderProps) {
    const user = useContext(NexusContext).user;
    return (
        <div className="sticky right-0 top-0 bg-white z-10 w-full">
            <div className="flex flex-row justify-between align-items-center items-center p-4 shadow-lg bg-white h-30">
                <div className="flex flex-row gap-2">
                    {openDrawer && <PanelLeftOpen onClick={openDrawer}/>}
                    <h1 className="text-xl">{currentPage}</h1>
                </div>
                {user ? <ProfileBadge/> : null}
            </div>
        </div>
    );
}
