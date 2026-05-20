import {useState} from "react";
import CustomBasicInput from "./FormsComponents/CustomBasicInput.tsx";
import EmailInput from "./FormsComponents/EmailInput.tsx";
import TelInput from "./FormsComponents/TelInput.tsx";
import type {AddEmployeeFormValues} from "./AddEmployeeFormValues.ts";
import {isValidPhoneNumber} from 'react-phone-number-input';
import {validateEmail} from "./validations.ts";


interface AddEmployeeFormProps {
    onSubmit: (formValues: AddEmployeeFormValues) => void;
}

export default function AddEmployeeForm({onSubmit}: AddEmployeeFormProps) {
    const [nom, setNom] = useState<string>("");
    const [prenom, setPrenom] = useState<string>("");
    const [poste, setposte] = useState<string>("");
    const [mail, setMail] = useState<string>("");
    const [noTel, setNoTel] = useState<string>("");

    const [touched, setTouched] = useState({
        nom: false,
        prenom: false,
        poste: false,
        mail: false,
        noTel: false,
    });

    // Fonctions de validation qui retournent le message d'erreur (ou undefined)
    const getNameError = () =>
        nom == "" ? "Le nom est requis" : undefined;

    const getPrenomError = () =>
        prenom == "" ? "Le prénom est requis" : undefined;

    const getPosteError = () =>
        poste == "" ? "Le poste est requis" : undefined;

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        // Marquer tous les champs comme touchés
        setTouched({nom: true, prenom: true, poste: true, mail: true, noTel: true});
        if (!getNameError() && !getPrenomError() && !getPosteError() && !validateEmail(mail) && isValidPhoneNumber(noTel)) {
            onSubmit({nom, prenom, poste, mail, noTel});
        }
    };


    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 rounded-lg">
            <CustomBasicInput
                id="nom"
                name="nom"
                description="Nom: "
                type="text"
                value={nom}
                onChange={(e) => setNom(e.target.value)}
                onBlur={() => setTouched({...touched, nom: true})}
                error={getNameError()}
                touched={touched.nom}
            />

            <CustomBasicInput
                id="prenom"
                name="prenom"
                description="Prénom: "
                type="text"
                value={prenom}
                onChange={(e) => setPrenom(e.target.value)}
                onBlur={() => setTouched({...touched, prenom: true})}
                error={getPrenomError()}
                touched={touched.prenom}
            />

            <CustomBasicInput
                id="poste"
                name="poste"
                description="Poste: "
                type="text"
                value={poste}
                onChange={(e) => setposte(e.target.value)}
                onBlur={() => setTouched({...touched, poste: true})}
                error={getPosteError()}
                touched={touched.poste}
            />

            <EmailInput
                id="mail"
                name="mail"
                description="Email: "
                value={mail}
                onChange={(e) => setMail(e.target.value)}
                onBlur={() => setTouched({...touched, mail: true})}
                touched={touched.mail}
            />

            <TelInput
                id="noTel"
                name="noTel"
                description="Numéro de téléphone: "
                value={noTel}
                onChange={(val) => setNoTel(val || "")}
                onBlur={() => setTouched({...touched, noTel: true})}
                touched={touched.noTel}
            />

            <button type="submit">Envoyer</button>
        </form>
    );
}