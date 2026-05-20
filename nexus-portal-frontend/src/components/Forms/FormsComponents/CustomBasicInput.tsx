import type {ChangeEvent} from "react";
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
    // permet par exemple de rajouter € a la fin
    inputSuffix?: string;
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
                                             onBlur,
                                             inputSuffix,
                                         }: CustomInputProps) {
    // Extrait le message d'erreur : soit une string, soit le premier message de l'objet
    const errorMessage = typeof error === 'string' ? error : Object.values(error ?? {})[0];
    const shouldShowError = touched && errorMessage;

    return (
        <div className="flex gap-2">
            <label className="w-1/2 align-text-top" htmlFor={id}>{description}</label>
            <div className="w-1/2 flex flex-col gap-1">
                <div className="flex flex-row gap 1">
                    <input
                        className={`w-full border rounded-full pl-2 ${shouldShowError ? 'outline-none border-red-500' : 'border-[#CACACA]'}`}
                        id={id}
                        name={name}
                        type={type}
                        value={String(value)}
                        onChange={(e) => {
                            onChange(e)
                        }}
                        onBlur={onBlur}
                    />
                    {inputSuffix != undefined && (
                        <div className="min-w-[15px] self-center text-right">{inputSuffix}</div>
                    )}
                </div>
                {shouldShowError && <ErrorText>{errorMessage}</ErrorText>}
            </div>
        </div>
    )

}