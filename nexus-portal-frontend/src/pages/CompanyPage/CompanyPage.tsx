import Page from "../Page";
import {useState} from "react";
import {useParams} from "react-router";
import {useQuery} from "@tanstack/react-query";
import CompanyHeader from "./CompanyHeader.tsx";
import CompanyMembers from "./CompanyMembers.tsx";
import type {CompanySection} from "./companySectionType.ts";
import CompanyOffers from "./CompanyOffers.tsx";
import {type CompanyType, CompanyZod} from "../../models/Company.ts";
import {fetchEndpoint, QUERY_KEYS} from "../../utils/endpoint.ts";


export default function CompanyPage() {
    const sections: CompanySection[] = ["Accueil", "Membres", "Offres", "Collaborations"]
    const [selectedSection, setSelectedSection] = useState<CompanySection>(sections[0]);
    const {id} = useParams();

    const {
        data: companyData,
        isError,
        error,
        isLoading,
    } = useQuery({
        queryKey: [QUERY_KEYS.COMPANY, id],
        queryFn: async () => {
            if (!id) throw new Error("Company id is missing");

            const data = await fetchEndpoint<CompanyType>("GET", `company/${id}`);
            const parsedCompany = CompanyZod.safeParse(data);

            if (parsedCompany.error) {
                throw new Error("Invalid company payload");
            }

            return parsedCompany.data;
        },
        enabled: Boolean(id),
    });

    if (isLoading) return <span>Loading...</span>;

    if (isError) return <span>{error.message}</span>;


    return (
        <Page name={"Entreprise"}>
            <div className="flex flex-col mr-16 ml-16 mt-8 gap-8">
                <CompanyHeader
                    companyData={companyData}
                    sections={sections}
                    selectedSection={selectedSection}
                    setSelectedSection={setSelectedSection}
                >
                </CompanyHeader>

                {selectedSection === "Accueil" && (
                    <p>Contenu de l'accueil de l'entreprise</p>
                )}

                {selectedSection === "Membres" && (
                    <CompanyMembers companyMembersID={[]}/>
                )}

                {selectedSection === "Offres" && (
                    <CompanyOffers></CompanyOffers>
                )}

                {selectedSection === "Collaborations" && (
                    <p>Collaborations de l'entreprise</p>
                )}
            </div>
        </Page>
    );
}
