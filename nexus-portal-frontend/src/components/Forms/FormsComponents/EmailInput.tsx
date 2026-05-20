import type {ChangeEvent} from "react";
import CustomBasicInput from "./CustomBasicInput.tsx";
import {validateEmail} from "../validations.ts";

interface EmailInputProps {
    id: string;
    name: string;
    description: string;
    value: string;
    onChange: (value: ChangeEvent<HTMLInputElement>) => void;
    onBlur?: () => void;
    touched?: boolean;
}

export default function EmailInput({id, name, description, value, onChange, onBlur, touched = false}: EmailInputProps) {
    return (
        <CustomBasicInput
            id={id}
            name={name}
            description={description}
            type="email"
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            error={validateEmail(value)}
            touched={touched}
        />
    );
}
