import PhoneInput, {isValidPhoneNumber} from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import ErrorText from "./errorText.tsx";

interface TelInputProps {
    id: string;
    name: string;
    description: string;
    value: string;
    onChange: (value: string | undefined) => void;
    onBlur?: () => void;
    touched?: boolean;
}

export default function TelInput({id, value, onChange, onBlur, description, touched = false}: TelInputProps) {
    const getError = () => {
        if (value === "") return "Le numéro de téléphone est requis";
        return !isValidPhoneNumber(value) ? "Le numéro de téléphone est invalide" : undefined;
    };

    const errorMessage = getError();
    const shouldShowError = touched && errorMessage;

    return (
        <div className="flex items-center gap-2">
            <label className="flex-1" htmlFor={id}>{description}</label>
            <div className="flex-1 flex flex-col gap-1">
                <PhoneInput
                    id={id}
                    defaultCountry="FR"
                    country="FR"
                    placeholder="+33 6 12 34 56 78"
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    style={{
                        border: shouldShowError ? "1px solid #ef4444" : "1px solid #CACACA",
                        borderRadius: "999px",
                        padding: "2px",
                        paddingLeft: "8px",
                    }}
                />
                {shouldShowError && <ErrorText>{errorMessage}</ErrorText>}
            </div>
        </div>
    );
}
