import type {Defense, DefenseCascade} from "../../models/Defense.ts";
import {differenceInCalendarDays} from "date-fns";
import type {DotData} from "./Dots.tsx";

export function isSameDay(a: Date, b: Date): boolean {
    return differenceInCalendarDays(a, b) === 0;
}

export function getObjectByDate(objects: Array<DotData | Defense>, date: Date): DotData | Defense | null {
    for (const item of objects) {
        if (isSameDay(new Date(item.date), date)) {
            return item;
        }
    }
    return null;
}

export function getDefenseKey(defense: DefenseCascade, index: number) {
    return `${index}-defense-${defense.id}`;
}

export function getPersonName(person: DefenseCascade["student"]) {
    return person?.name ?? "Inconnu";
}

export function getHeureDebutFin(timeStart: Date, timeEnd: Date) {
    return `${timeStart.getHours()} h - ${timeEnd.getHours()} h`;
}

export function dateDisplay(timeStart: Date) {
    const day = timeStart.getDate();
    const monthName = new Intl.DateTimeFormat('fr-FR', {month: 'long'}).format(timeStart);
    return `${day} ${monthName}`;
}
