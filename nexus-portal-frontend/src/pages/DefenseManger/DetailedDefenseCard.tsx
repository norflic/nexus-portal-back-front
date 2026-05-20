import type {DefenseCascade} from "../../models/Defense.ts";
import {dateDisplay, getHeureDebutFin, getPersonName} from "./DefenseUtils.ts";
import {useEffect, useRef} from "react";
import BaseDefenseCard from "./BaseDefenseCard.tsx";

type DefensePanelProps = {
    selectedDefense: DefenseCascade | null;
};


export default function DetailedDefenseCard({selectedDefense}: DefensePanelProps) {
    const companyName = useRef("companyName");
    const timeStart = useRef(new Date());
    const timeEnd = useRef(new Date());
    const CompanyMentor = useRef("Mentor name");
    const CandideTeacher = useRef("CandideTeacher name");
    const TechnicalTeacher = useRef("TechnicalTeacher name");
    const studentName = useRef("student name");

    const updateDefenseDetails = (defense: DefenseCascade) => {
        companyName.current = defense.company?.name ?? "Nom non trouvé";
        timeStart.current = new Date(defense.date);
        timeEnd.current = new Date(defense.date);
        timeEnd.current.setHours(timeEnd.current.getHours() + 1);
        CompanyMentor.current = getPersonName(defense.company_member);
        CandideTeacher.current = getPersonName(defense.candid_teacher);
        TechnicalTeacher.current = getPersonName(defense.tech_teacher);
        studentName.current = getPersonName(defense.student);
    };

    useEffect(() => {
        if (selectedDefense) {
            updateDefenseDetails(selectedDefense);
        }
    }, [selectedDefense]);

    function titleDisplay(studentName: string, timeStart: Date) {
        return "soutenance de " + studentName + " - " + dateDisplay(timeStart);
    }

    return (
        (selectedDefense && (
            <BaseDefenseCard className="border-selected-blue">
                <h1>{titleDisplay(studentName.current, timeStart.current)}</h1>
                <div>{getHeureDebutFin(timeStart.current, timeEnd.current)}</div>
                <div>Entreprise : {companyName.current}</div>
                <div>Tuteur en entreprise : {CompanyMentor.current}</div>
                <div>Professeur Candide : {CandideTeacher.current}</div>
                <div>Professeur technicien.ne : {TechnicalTeacher.current}</div>
            </BaseDefenseCard>
        )) || (
            <BaseDefenseCard className="border-selected-blue">
                <h1>Aucune soutenance sélectionnée</h1>
            </BaseDefenseCard>
        )
    );
}
