import type {DefenseCascade} from "../../models/Defense.ts";
import type {Dispatch, SetStateAction} from "react";
import DefenseCard from "./DefenseCard.tsx";
import {getDefenseKey} from "./DefenseUtils.ts";

function sortDefensesByDate(defenses: DefenseCascade[]): DefenseCascade[] {
    return defenses.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
}

type DefenseListProps = {
    defenses: DefenseCascade[];
    selectedDefense: DefenseCascade | null;
    setSelectedDefense: Dispatch<SetStateAction<DefenseCascade | null>>;
};

export default function DefenseList({defenses, selectedDefense, setSelectedDefense}: DefenseListProps) {
    const sortedDefenses = sortDefensesByDate(defenses);

    return (
        <div className="flex flex-col gap-4 min-w-100 ml-4">
            {sortedDefenses.map((defense, index) => {
                const defenseKey = getDefenseKey(defense, index);

                return (
                <div
                    key={defenseKey}
                    onClick={() => {
                        setSelectedDefense(defense);
                    }}
                >
                    <DefenseCard defense={defense} isSelected={defense.id === selectedDefense?.id}/>
                </div>
                )
            })}
        </div>

    )
}
