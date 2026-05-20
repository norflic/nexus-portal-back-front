import {NavLink} from "react-router";
import {NexusContext} from "../../NexusContextProvider";
import React from "react";

type SideBarLink = {
    title: string;
    to: string;
};

export default function SideBarLinks() {
    const context = React.useContext(NexusContext);
    const user = context.user
    const isAdmin = !!user?.is_admin;

    const links: SideBarLink[] = [
        {title: "Offres", to: "/offers"},
        {title: "Fiche d'entreprise", to: "/companies"},
        {title: "Pipeline", to: "/pipeline"},
        {title: "Gestion de soutenances", to: "/gestion_soutenances"},
        {title: "Paramètres", to: "/settings"},
    ];

    if (user) {
        links.splice(1, 0, {title: "Mon profil", to: `/user/${user.id}`});
    }
    if (isAdmin) {
        links.push({title: "Admin", to: "/admin"});
    }

    return (
        <div className="flex flex-col gap-4 text-app-blue-light m-0">
            {links.map((link) => (
                <NavLink key={link.to} to={link.to} className={"p-2 ml-0 mr-0"}>
                    {link.title}
                </NavLink>
            ))}
        </div>
    );
}
