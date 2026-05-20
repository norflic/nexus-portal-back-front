import React from "react";
import {Navigate} from "react-router";
import {NexusContext} from "../../NexusContextProvider";

type RequireRoleProps = {
    requireAdmin?: boolean;
    allowedRoles?: string[];
    children?: React.ReactNode;
    Component?: React.ComponentType<unknown> | null;
};

export default function RequireRole({requireAdmin, allowedRoles, children, Component}: RequireRoleProps) {
    const {user} = React.useContext(NexusContext);

    const isLogged = !!user;

    const isAdmin = !!user?.is_admin;
    const role = user?.user_type ?? null;

    const allowed = (requireAdmin && isAdmin) || (allowedRoles && role && allowedRoles.includes(role)) || (!requireAdmin && !allowedRoles);

    if (!isLogged) {
        return <Navigate to="/login" replace/>;
    }

    if (!allowed) {
        return <Navigate to="/not-authorized" replace/>;
    }

    if (Component) {
        return <Component/>;
    }

    return <>{children}</>;
}


