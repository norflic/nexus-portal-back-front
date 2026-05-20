import CompanySearchBar from "./CompanySearchBar.tsx";
import BasicButton from "../../components/Buttons/BasicButton.tsx";
import type {SearchResultType} from "../../components/SearchBar/SearchResults.tsx";
import {useNavigate} from "react-router";

import Page from "../Page.tsx";

export default function CompaniesPage() {
    const navigate = useNavigate();


    function onClick() {
        navigate('/company/new');
    }

    function companySelected(company: SearchResultType) {
        console.log("company selected", company);
        navigate('/company/' + company.id);
    }

    return (
        <Page name={"Companies"}>
            <div className="m-8">
                <CompanySearchBar className="mb-8" companySelected={companySelected}></CompanySearchBar>
                <BasicButton className="w-fit" onClickFunction={onClick}>
                    Créer une nouvelle entreprise
                </BasicButton>
                <div className="mt-8">
                    afficher entreprises les plus populaires
                </div>
            </div>
        </Page>
    )
}
