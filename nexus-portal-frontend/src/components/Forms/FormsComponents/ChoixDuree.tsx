import ErrorText from "./errorText.tsx";
import type {UniteDuree} from "../AddOfferFormValues.ts";

interface ChoixDureeProps {
    id: string;
    name: string;
    description: string;
    durationQuantity: number;
    durationUnit: UniteDuree;
    onQuantityChange: (value: number) => void;
    onUnitChange: (value: UniteDuree) => void;
    error?: string | Record<string, string>;
    // sert a ignorer l'affichage de l'erreur tant que l'input n'a pas été touché
    touched?: boolean;
    // permet d'afficher l'erreur quand le focus est perdu
    onBlur?: () => void;
}

export default function ChoixDuree({
                                       id,
                                       name,
                                       description,
                                       durationQuantity,
                                       durationUnit,
                                       onQuantityChange,
                                       onUnitChange,
                                       error,
                                       touched = false,
                                       onBlur
                                   }: ChoixDureeProps) {
    // Extrait le message d'erreur : soit une string, soit le premier message de l'objet
    const errorMessage = typeof error === 'string' ? error : Object.values(error ?? {})[0];
    const shouldShowError = touched && errorMessage;

    return (
        <div className="flex gap-2">
            <label className="w-1/2 align-text-top" htmlFor={id}>{description}</label>
            <div className="w-1/2 flex flex-col gap-1">
                <div className="flex gap-2">
                    <input
                        className={`border rounded-full pl-2 min-w-10 ${shouldShowError ? 'outline-none border-red-500' : 'border-[#CACACA]'}`}
                        id={id}
                        name={name}
                        type="number"
                        min="1"
                        value={durationQuantity}
                        onChange={(e) => onQuantityChange(Number(e.target.value))}
                        onBlur={onBlur}
                    />
                    <select
                        className={`border rounded-full pl-2 flex-shrink-0 ${shouldShowError ? 'outline-none border-red-500' : 'border-[#CACACA]'}`}
                        value={durationUnit}
                        onChange={(e) => onUnitChange(e.target.value as UniteDuree)}
                        onBlur={onBlur}
                    >
                        <option value="jour">Jour(s)</option>
                        <option value="semaine">Semaine(s)</option>
                        <option value="mois">Mois</option>
                    </select>
                </div>
                {shouldShowError && <ErrorText>{errorMessage}</ErrorText>}
            </div>
        </div>
    )

}