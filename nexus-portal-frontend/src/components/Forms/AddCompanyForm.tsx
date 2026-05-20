import {useState} from "react";
import {isValidPhoneNumber} from "react-phone-number-input";
import CustomBasicInput from "./FormsComponents/CustomBasicInput.tsx";
import EmailInput from "./FormsComponents/EmailInput.tsx";
import TelInput from "./FormsComponents/TelInput.tsx";
import {validateEmail} from "./validations.ts";
import type {AddCompanyFormValues} from "./AddCompanyFormValues.ts";

interface AddCompanyFormProps {
    onSubmit: (formValues: AddCompanyFormValues) => void;
}

export default function AddCompanyForm({onSubmit}: AddCompanyFormProps) {
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [tel, setTel] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [streetNb, setStreetNb] = useState<number>(0);
    const [streetName, setStreetName] = useState<string>("");
    const [cityName, setCityName] = useState<string>("");
    const [postalCode, setPostalCode] = useState<number>(0);
    const [website, setWebsite] = useState<string>("");

    const [touched, setTouched] = useState({
        name: false,
        email: false,
        tel: false,
        description: false,
        streetNb: false,
        streetName: false,
        cityName: false,
        postalCode: false,
        website: false,
    });

    const getNameError = () =>
        name === "" ? "Le nom de l'entreprise est requis" : undefined;

    const getEmailError = () => validateEmail(email);

    const getTelError = () => {
        if (tel === "") return "Le numéro de téléphone est requis";
        return !isValidPhoneNumber(tel) ? "Le numéro de téléphone est invalide" : undefined;
    };

    const getDescriptionError = () =>
        description === "" ? "La description est requise" : undefined;

    const getStreetNbError = () =>
        streetNb <= 0 ? "Le numéro de rue est requis" : undefined;

    const getStreetNameError = () =>
        streetName === "" ? "Le nom de rue est requis" : undefined;

    const getCityNameError = () =>
        cityName === "" ? "La ville est requise" : undefined;

    const getPostalCodeError = () =>
        postalCode <= 0 ? "Le code postal est requis" : undefined;

    const getWebsiteError = () =>
        website === "" ? "Le site web est requis" : undefined;

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        setTouched({
            name: true,
            email: true,
            tel: true,
            description: true,
            streetNb: true,
            streetName: true,
            cityName: true,
            postalCode: true,
            website: true,
        });

        if (
            !getNameError() &&
            !getEmailError() &&
            !getTelError() &&
            !getDescriptionError() &&
            !getStreetNbError() &&
            !getStreetNameError() &&
            !getCityNameError() &&
            !getPostalCodeError() &&
            !getWebsiteError()
        ) {
            onSubmit({
                name,
                email,
                tel,
                description,
                street_nb: streetNb,
                street_name: streetName,
                city_name: cityName,
                postal_code: postalCode,
                website,
            });
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 rounded-lg">
            <CustomBasicInput
                id="name"
                name="name"
                description="Nom de l'entreprise: "
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onBlur={() => setTouched({...touched, name: true})}
                error={getNameError()}
                touched={touched.name}
            />

            <EmailInput
                id="email"
                name="email"
                description="Email: "
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={() => setTouched({...touched, email: true})}
                touched={touched.email}
            />

            <TelInput
                id="tel"
                name="tel"
                description="Téléphone: "
                value={tel}
                onChange={(val) => setTel(val || "")}
                onBlur={() => setTouched({...touched, tel: true})}
                touched={touched.tel}
            />

            <CustomBasicInput
                id="description"
                name="description"
                description="Description: "
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                onBlur={() => setTouched({...touched, description: true})}
                error={getDescriptionError()}
                touched={touched.description}
            />

            <CustomBasicInput
                id="street_nb"
                name="street_nb"
                description="Numéro de rue: "
                type="number"
                value={streetNb}
                onChange={(e) => setStreetNb(Number(e.target.value))}
                onBlur={() => setTouched({...touched, streetNb: true})}
                error={getStreetNbError()}
                touched={touched.streetNb}
            />

            <CustomBasicInput
                id="street_name"
                name="street_name"
                description="Nom de rue: "
                type="text"
                value={streetName}
                onChange={(e) => setStreetName(e.target.value)}
                onBlur={() => setTouched({...touched, streetName: true})}
                error={getStreetNameError()}
                touched={touched.streetName}
            />

            <CustomBasicInput
                id="city_name"
                name="city_name"
                description="Ville: "
                type="text"
                value={cityName}
                onChange={(e) => setCityName(e.target.value)}
                onBlur={() => setTouched({...touched, cityName: true})}
                error={getCityNameError()}
                touched={touched.cityName}
            />

            <CustomBasicInput
                id="postal_code"
                name="postal_code"
                description="Code postal: "
                type="number"
                value={postalCode}
                onChange={(e) => setPostalCode(Number(e.target.value))}
                onBlur={() => setTouched({...touched, postalCode: true})}
                error={getPostalCodeError()}
                touched={touched.postalCode}
            />

            <CustomBasicInput
                id="website"
                name="website"
                description="Site web: "
                type="text"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                onBlur={() => setTouched({...touched, website: true})}
                error={getWebsiteError()}
                touched={touched.website}
            />

            <button type="submit">Envoyer</button>
        </form>
    );
}
