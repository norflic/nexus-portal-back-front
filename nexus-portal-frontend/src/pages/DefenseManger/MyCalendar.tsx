import {type Dispatch, type SetStateAction, useEffect, useState} from "react";
import Calendar from 'react-calendar';
import Dots, {type DotData} from "./Dots.tsx";
import type {DefenseCascade} from "../../models/Defense.ts";
import {useQuery} from "@tanstack/react-query";
import {fetchEndpoint} from "../../utils/endpoint";
import {getObjectByDate, isSameDay} from "./DefenseUtils.ts";

type CalendarProps = {
    setDefenses: Dispatch<SetStateAction<DefenseCascade[]>>;
    selectedDate: Date;
    setSelectedDate: Dispatch<SetStateAction<Date>>;
};

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];


function computeDotsData(previousDots: DotData[], newDefenses: DefenseCascade[]): DotData[] {
    const newDots = [...previousDots];
    for (const defense of newDefenses) {
        const defenseDate = new Date(defense.date);
        const dot = getObjectByDate(newDots, defenseDate) as DotData;

        if (dot) {
            dot.nbDots += 1;
        } else {
            newDots.push({date: defenseDate, nbDots: 1});
        }
    }
    return newDots;
}

function getMonthYearFromDate(date: Date) {
    return {
        year: date.getFullYear(),
        month: date.getMonth() + 1,
    };
}

export default function MyCalendar({setDefenses, selectedDate, setSelectedDate}: CalendarProps) {
    const [value, onChange] = useState<Value>(new Date());
    const [dotsData, setDotsData] = useState<DotData[]>([]);
    const [clickedDate, setClickedDate] = useState<Date | null>(null);

    const {year, month} = getMonthYearFromDate(selectedDate);

    const {data, error} = useQuery({
        queryKey: ["defenses", year, month],
        queryFn: () => fetchEndpoint<DefenseCascade[], { data: { year: number; month: number } }>(
            "POST",
            "defenses/getByDateCascade",
            {body: {data: {year, month}}}
        ),
    });

    useEffect(() => {
        if (data) {
            setDefenses(data);
            // console.log(data)
            setDotsData(computeDotsData([], data));
        }
        if (error) {
            console.log("Erreur defenses:", error);
        }
    }, [data, error, setDefenses]);

    function tileContent({date, view}: { date: Date, view: string }) {
        if (view === 'month') {
            const dot = dotsData.find(dot => isSameDay(dot.date, date));
            if (dot) {
                const dotDayIsClickedDay = isSameDay(clickedDate as Date, dot.date)
                const dotClassName = dotDayIsClickedDay ? "bg-white" : "bg-black";

                return (
                    <div className="flex items-center justify-center mt-1">
                        <Dots dotClassName={dotClassName} dotData={dot}/>
                    </div>
                );
            }
        }
        return null;
    }

    return (
        <div className="w-full">
            <h1 className="text-xl text-center pb-4">Calendrier des soutenances</h1>
            <Calendar
                className="min-w-100 rounded-2xl"
                onChange={(value) => {
                    onChange(value);
                    if (value instanceof Date) {
                        setClickedDate(value);
                    }

                }}
                value={value}
                calendarType={"gregory"}
                tileContent={tileContent}
                onActiveStartDateChange={({activeStartDate}) => {
                    setSelectedDate(activeStartDate as Date);
                }}
            />
        </div>
    );
}
