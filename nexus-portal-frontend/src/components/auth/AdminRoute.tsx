import RequireRole from "./RequireRole";
import AdminPage from "../../pages/AdminPage/AdminPage";

export default function AdminRoute() {
    return <RequireRole requireAdmin={true} Component={AdminPage}/>;
}

