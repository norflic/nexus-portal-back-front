import type {BasicTableButton} from "../../components/tables/BasicTableButton.ts";
import {useEffect, useState} from "react";
import BasicTable from "../../components/tables/BasicTable.tsx";
import AjoutOfferPopup from "../../components/Popups/AjoutOfferPopup.tsx";
import type {AddOfferFormValues} from "../../components/Forms/AddOfferFormValues.ts";

type CompanyOffersProps = {
};

type Row = [string, string, string, string, string, string]

// eslint-disable-next-line no-empty-pattern
export default function CompanyOffers({}: CompanyOffersProps) {
    const title = "Offres"
    const titles = ["Titre", "Date", "Type", "Candidatures", "Statut", "Action"]
    const tableButtons: BasicTableButton[] = [
        {
            text: "Ajouter une offre", fun: () => {
                setIsOpen(true)
            }
        }
    ]
    const [data, setData] = useState<Row[]>([])

    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {

        setData([
            ["Développeur Full Stack", "15/01/2026", "CDI", "12", "Ouvert", "Voir"],
            ["Designer UX/UI", "10/01/2026", "CDD 6 mois", "8", "Ouvert", "Voir"],
            ["Chef de Projet Digital", "20/12/2025", "CDI", "5", "Pourvu", "Voir"],
            ["Data Analyst", "18/01/2026", "CDI", "15", "Ouvert", "Voir"],
            ["Responsable Marketing", "12/01/2026", "CDI", "7", "Ouvert", "Voir"],
            ["Administrateur Système", "25/12/2025", "CDI", "3", "Pourvu", "Voir"],
            ["Testeur QA", "22/01/2026", "CDD 3 mois", "10", "Ouvert", "Voir"],
            ["Ingénieur Cloud", "16/01/2026", "CDI", "6", "En cours", "Voir"],
            ["Gestionnaire de Contrats", "08/01/2026", "CDI", "4", "Ouvert", "Voir"],
            ["Consultant en Cybersécurité", "19/01/2026", "CDI", "9", "Ouvert", "Voir"],
        ]);
    }, []);

    function submitForm(offer: AddOfferFormValues) {
        console.log(offer)
    }


    return (
        <>
            <BasicTable titleProp={title} titlesListProp={titles} dataProp={data} buttonsProp={tableButtons}/>
            <AjoutOfferPopup
                isOpen={isOpen}
                title="Ajouter une offre"
                close={() => {
                    setIsOpen(false)
                }}
                onSubmit={(formValues) => {
                    submitForm(formValues)
                }}
            >
            </AjoutOfferPopup>
        </>

    );
}
