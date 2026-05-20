import BasicTable from "../../components/tables/BasicTable.tsx";
import {useEffect, useState} from "react";
import type {BasicTableButton} from "../../components/tables/BasicTableButton.ts";
import AjoutEmployePopup from "../../components/Popups/AjoutEmployePopup.tsx";
import type {AddEmployeeFormValues} from "../../components/Forms/AddEmployeeFormValues.ts";

type CompanyMembersProps = {
    companyMembersID: string[],
};

type Row = [string, string, string, string, string]

export default function CompanyMembers({companyMembersID}: CompanyMembersProps) {
    const title = "Membres"
    const titles = ["Nom / Prenom", "n°tel", "Mail", "Poste", "Action"]
    const tableButtons: BasicTableButton[] = [
        {
            text: "Ajouter un employé", fun: () => {
                setIsOpen(true)
            }
        }
    ]
    const [data, setData] = useState<Row[]>([])

    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {

        setData([
            ["Dupont Jean", "06 12 34 56 78", "jean.dupont@mail.com", "Président", "Voir"],
            ["Martin Claire", "06 23 45 67 89", "claire.martin@mail.com", "Secrétaire", "Voir"],
            ["Durand Paul", "07 11 22 33 44", "paul.durand@mail.com", "Trésorier", "Voir"],
            ["Lefevre Sophie", "06 98 76 54 32", "sophie.lefevre@mail.com", "Membre", "Voir"],
            ["Moreau Lucas", "07 45 67 89 10", "lucas.moreau@mail.com", "Membre", "Voir"],
            ["Roux Emma", "06 55 44 33 22", "emma.roux@mail.com", "Vice-présidente", "Voir"],
            ["Petit Hugo", "07 88 99 00 11", "hugo.petit@mail.com", "Membre", "Voir"],
            ["Garcia Laura", "06 66 77 88 99", "laura.garcia@mail.com", "Membre", "Voir"],
            ["Bernard Thomas", "07 10 20 30 40", "thomas.bernard@mail.com", "Membre", "Voir"],
            ["Robert Julie", "06 21 43 65 87", "julie.robert@mail.com", "Chargée de communication", "Voir"],
        ]);
    }, [companyMembersID]);

    function submitForm(employee: AddEmployeeFormValues) {
        console.log(employee)
    }


    return (
        <>
            <BasicTable titleProp={title} titlesListProp={titles} dataProp={data} buttonsProp={tableButtons}/>
            <AjoutEmployePopup
                isOpen={isOpen}
                title="Ajouter un employé"
                close={() => {
                    setIsOpen(false)
                }}
                onSubmit={(formValues) => {
                    submitForm(formValues)
                }}
            >
            </AjoutEmployePopup>
        </>

    );
}
