import {type ChangeEvent, useState} from "react";
import ErrorText from "./errorText.tsx";

interface CustomInputProps {
    id: string;
    name: string;
    description: string;
    type: string;
    value: number | string;
    onChange: (value: ChangeEvent<HTMLInputElement>) => void;
    error?: string | Record<string, string>;
    // sert a ignorer l'affichage de l'erreur tant que l'input n'a pas été touché
    touched?: boolean;
    // permet d'afficher l'errerur quand le focus est perdu
    onBlur?: () => void;
}

export default function CustomBasicInput({
                                             id,
                                             name,
                                             description,
                                             type,
                                             value,
                                             onChange,
                                             error,
                                             touched = false,
                                             onBlur
                                         }: CustomInputProps) {
    // Extrait le message d'erreur : soit une string, soit le premier message de l'objet
    const errorMessage = typeof error === 'string' ? error : Object.values(error ?? {})[0];
    const shouldShowError = touched && errorMessage;
    const [checkBoxTouched, setCheckboxTouched] = useState<boolean>();

    return (
        <>
            <div>
                <input type="checkbox"
                       value={value}
                       onChange={() => {
                           setCheckboxTouched(!checkBoxTouched)
                       }}
                       checked={checkBoxTouched}/>
            </div>
            if (checkboxChecked){
            <div className="flex gap-2">
                <label className="flex-1 align-text-top" htmlFor={id}>{description}</label>
                <div className="flex-1 flex flex-col gap-1">
                    <input
                        className={`border rounded-full ml-2 ${shouldShowError ? 'outline-none border-red-500' : 'border-[#CACACA]'}`}
                        id={id}
                        name={name}
                        type={type}
                        value={String(value)}
                        onChange={(e) => {
                            onChange(e)
                        }}
                        onBlur={onBlur}
                    />
                    {shouldShowError && <ErrorText>{errorMessage}</ErrorText>}
                </div>
            </div>
        }
        </>
    )

}