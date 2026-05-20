import Paging from "../Paging/Paging.tsx";
import {useEffect, useState} from "react";
import type {BasicTableButton} from "./BasicTableButton.ts";
import BasicButton from "../Buttons/BasicButton.tsx";

interface MainTableProps {
    titleProp: string;
    titlesListProp: string[];
    dataProp: string[][];
    buttonsProp?: BasicTableButton[];
    className?: string | undefined;
}

export default function BasicTable({
    titleProp,
    titlesListProp,
    dataProp,
                                       buttonsProp,
                                       className = ""
}: MainTableProps) {

    const linesShown = 4;

    function getShownData(pageNumber: number) {
        const src = Array.isArray(dataProp) ? dataProp : [];
        return src.slice(
            (pageNumber - 1) * linesShown,
            pageNumber * linesShown
        );
    }

    const [shownData, setShownData] = useState<string[][]>([]);

    useEffect(() => {
        setShownData(getShownData(1));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dataProp]);

    function onPageChange(newPageNumber: number) {
        setShownData(getShownData(newPageNumber));
    }

    function checkDataIsValid(): boolean {
        let isValid = true;
        if (!checkDataSizeCorrspondsToTitlesSize()) {
            isValid = false;
        }

        return isValid;
    }

    function checkDataSizeCorrspondsToTitlesSize(): boolean {
        const titleSize = titlesListProp.length;
        for (const line of dataProp) {
            if (line.length !== titleSize) {
                console.warn(`Une ligne a ${line.length} cellules mais il y a seulement ${titleSize} titres.
                    Veuillez vérifier les données fournies au tableau.`);
                return false;
            }
        }
        return true;
    }

    // Validate props after hooks are declared to keep hook order stable
    if (!titleProp || !titlesListProp || !dataProp) {
        return (
            // TODO : faire un composant d'erreur réutilisable
            <div className="border border-red-500 p-4 text-red-500">
                Erreur : Données manquantes pour afficher le tableau
            </div>
        );
    }

    // Optional data validation
    checkDataIsValid();

    return (
        <div className={` border border-[#CACACA] border-r-4 ${className}`}>
            <div className="p-2 pl-4 text-lg">{titleProp}</div>
            <table className="w-full text-center">
                <thead className="bg-[#E5E7EB] border border-[#CACACA] border-r-0 border-l-0">
                    <tr>
                        {titlesListProp.map((title, index) => (
                            <th
                                key={index}
                                className="text-[#6B7280] font-normal text-lg p-2"
                            >
                                {title}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {shownData.map((line, index) => (
                        <tr key={index} className="">
                            {line.map((cell, cellIndex) => (
                                <td
                                    key={cellIndex}
                                    className="p-2 border-b border-[#CACACA]"
                                >
                                    {cell}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="flex gap-2 justify-between p-4">
                <div></div>
                {buttonsProp?.map((button, index) => (
                    <BasicButton
                        key={index}
                        onClickFunction={button.fun}
                    >
                    {button.text}
                    </BasicButton>
                ))}
                <Paging
                    itemsPerPage={linesShown}
                    onPageChange={onPageChange}
                    totalItems={dataProp.length}>

                </Paging>
            </div>
        </div>
    );
}