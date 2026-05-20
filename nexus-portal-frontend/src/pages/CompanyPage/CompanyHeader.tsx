import Card from "../../components/Card/Card.tsx";
import {useEffect} from "react";
import CompanySectionChoice from "./CompanySectionChoice.tsx";
import type {CompanySection} from "./companySectionType.ts";
import appleLogo from "../../img/logo-entreprises/apple.png";
import type {CompanyType} from "../../models/Company.ts";

type CompanyHeaderProps = {
    companyData: CompanyType | undefined;
    sections: CompanySection[];
    selectedSection: CompanySection;
    setSelectedSection: React.Dispatch<React.SetStateAction<CompanySection>>;
};

export default function CompanyHeader({
                                          companyData,
                                          sections,
                                          selectedSection,
                                          setSelectedSection,
                                      }: CompanyHeaderProps) {
    useEffect(() => {
        //     init company from DB
    }, []);

    const selectedBorderClass = "border-gray-300 border-2 ";
    const bottomStyle = "pb-0 pl-0 pr-0 rounded-b-2xl";

    function onClick() {
    }

    return (
        <Card
            className={`flex flex-col flex-wrap border-2 ${bottomStyle} ${selectedBorderClass}`}
            onClick={onClick}
        >
            {companyData && (
            <div className="flex flex-row justify-between grow">
                <div className="m-4 shrink-0">
                    <img
                        className="w-20 shrink-0"
                        src={appleLogo}
                        alt={`logo ${companyData.name}`}
                    />
                </div>
                <div>
                    <h1 className="text-2xl">{companyData.name}</h1>
                    <p className="text-app-gray">{companyData.description}</p>
                </div>
                <div className="flex flex-col w-150 gap-1 m-4">
                    <div>site web : {companyData.website}</div>
                    <div>mail : {companyData.email}</div>
                    <div>tel : {companyData.tel}</div>
                    <div>
                        adresse : {companyData.street_nb}{" "}
                        {companyData.street_name}, {companyData.postal_code}{" "}
                        {companyData.city_name}
                    </div>
                </div>
            </div>
            )}
            {!companyData && (
                <div>
                    Les données ed l'entreprise sont en train de charger
                </div>
            )}
            <CompanySectionChoice
                titlesList={sections}
                bottomStyle={bottomStyle}
                selectedSection={selectedSection}
                setSelectedSection={setSelectedSection}
            ></CompanySectionChoice>
        </Card>
    );
}
