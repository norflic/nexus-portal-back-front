import {createBrowserRouter} from "react-router";
import OfferPage from "./pages/OfferPage/OfferPage";
import App from "./App";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import StudentPage from "./pages/StudentPage/StudentPage";
import CompanyPage from "./pages/CompanyPage/CompanyPage.tsx";
import LoginPage from "./pages/LoginPage/LoginPage.tsx";
import PipelinePage from "./pages/PipelinePage/PipelinePage.tsx";
import AdminRoute from "./components/auth/AdminRoute.tsx";
import DefenseRoute from "./components/auth/DefenseRoute.tsx";
import NotAuthorizedPage from "./pages/NotAuthorizedPage/NotAuthorizedPage.tsx";
import CompaniesPage from "./pages/CompaniesPage/CompaniesPage.tsx";
import NewCompanyPage from "./pages/NewCompany/NewCompanyPage.tsx";

const routes = [
    {
        path: "/admin/*",
        Component: AdminRoute,
    },
    {
        path: "/",
        Component: App,
        children: [
            {
                index: true,
                Component: LoginPage,
            },
            {
                path: "offers",
                Component: OfferPage,
            },
            {
                path: "companies",
                Component: CompaniesPage,
            },
            {
                path: "company/new",
                Component: NewCompanyPage,
            },
            {
                path: "company/:id",
                Component: CompanyPage,
            },
            {
                path: "user/:id",
                Component: StudentPage,
            },
            {
                path: "login",
                Component: LoginPage,
            },
            {
                path: "pipeline",
                Component: PipelinePage,
            },
            {
                path: "not-authorized",
                Component: NotAuthorizedPage,
            },
            {
                path: "gestion_soutenances",
                Component: DefenseRoute,
            },
            {
                path: "*",
                Component: NotFoundPage,
            },
        ],
    },
];

export const router = createBrowserRouter(routes);
