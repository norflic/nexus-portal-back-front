import type {DefenseCascade} from "../../models/Defense.ts";
import {dateDisplay, getHeureDebutFin, getPersonName} from "./DefenseUtils.ts";
import BaseDefenseCard from "./BaseDefenseCard.tsx";

type DefensePanelProps = {
    defense: DefenseCascade;
    isSelected: boolean;
};


export default function DefenseCard({defense, isSelected}: DefensePanelProps) {
    const timeStart = new Date(defense.date);
    const timeEnd = new Date(defense.date);
    const studentName = getPersonName(defense.student);


    const cardClassName = `${isSelected ? "border-selected-blue" : "border-transparent"}`;

    return (
        (defense && (
            <div className="h-full">
                <BaseDefenseCard className={`${cardClassName} flex flex-col`}> {/* Ajout de flex pour aligner */}
                    <h1 className="text-xl">{dateDisplay(timeStart)}</h1>
                    <div className="text-app-gray">{getHeureDebutFin(timeStart, timeEnd)}</div>
                    <div>{"Soutenance de " + studentName}</div>
                </BaseDefenseCard>
            </div>
        ))
    );
}
