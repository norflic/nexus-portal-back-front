import {SPECIALITIES_LIST, type Speciality} from "../Speciality.ts";
import type {Dispatch, SetStateAction} from "react";

interface SpecialityFormProps {
    specialty: Speciality[];
    setSpecialty: Dispatch<SetStateAction<Speciality[]>>;
}

export default function SpecialityForm({specialty, setSpecialty}: SpecialityFormProps) {
    const toggleSpeciality = (item: Speciality) =>
        setSpecialty(prev =>
            prev.includes(item) ? prev.filter(v => v !== item) : [...prev, item]
        );

    return (
        <fieldset className="flex flex-row flex-wrap gap-4">
            <legend className="font-medium w-full pb-2">Spécialités :</legend>
            {SPECIALITIES_LIST.map(({value, label}) => {
                const val = value as Speciality;
                return (
                    <label key={value} htmlFor={value} className="flex items-center gap-2 w-[calc(50%-0.5rem)]">
                        <span>{label}</span>
                        <input
                            id={value}
                            type="checkbox"
                            name="specialty"
                            value={value}
                            checked={specialty.includes(val)}
                            onChange={() => toggleSpeciality(val)}
                        />
                    </label>
                );
            })}
        </fieldset>

    )
}