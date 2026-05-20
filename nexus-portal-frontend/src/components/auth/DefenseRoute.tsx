import RequireRole from "./RequireRole";
import DefenseManager from "../../pages/DefenseManger/DefenseManager";

export default function DefenseRoute() {
    return <RequireRole allowedRoles={["year_manager"]} Component={DefenseManager}/>;
}

