import BasicTable from "./BasicTable.tsx";
import {Towns} from "../Forms/FormsComponents/Town.ts";
import type {BasicTableButton} from "./BasicTableButton.ts";

export default function PreferedTowns() {
    // ce composant ne fonctionne pas, il est la pour faire joli
    //TODO : la partie fonctionnelle du composant
    const dataTableau: string[][] = [];
    for (const town of Towns) {
        dataTableau.push([town.name, "Supprimer"]);
    }

    function callTownChoicePopup() {
        console.log("appelle la popup pour ajouter des villes");
    }

    const tableButtons: BasicTableButton[] = [
        {text: "Ajouter une ville", fun: callTownChoicePopup}
    ]
    return (
        <div>
            <BasicTable
                titleProp="villes préférées"
                titlesListProp={["Nom Ville", "Action"]}
                dataProp={dataTableau}
                buttonsProp={tableButtons}
                className="m-4"
            >
            </BasicTable>
        </div>
    )
}