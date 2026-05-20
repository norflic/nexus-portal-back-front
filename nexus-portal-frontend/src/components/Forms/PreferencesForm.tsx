import {useState} from "react";
import type {PreferencesFormValues} from "./PreferenceFormValues.ts";
import CustomBasicInput from "./FormsComponents/CustomBasicInput.tsx";
import type {Speciality} from "./Speciality.ts";
import PreferedTowns from "../tables/PreferedTowns.tsx";
import SpecialityForm from "./FormsComponents/SpecialityForm.tsx";


interface preferencesProps {
    onSubmit: (formValues: PreferencesFormValues) => void;
}

export default function PreferencesForm({onSubmit}: preferencesProps) {
    const [nbApprenticeship, setNbApprenticeship] = useState<number>(0);
    const [nbInternships, setNbInternships] = useState<number>(0);
    const [specialty, setSpecialty] = useState<Speciality[]>([]);
    const preferedCities: string[] = []// const [preferedCities, setPreferedCities] = useState<string[]>([]);

    const [touched, setTouched] = useState({
        nbApprenticeship: false,
        nbInternships: false,
    });

    // Fonctions de validation qui retournent le message d'erreur (ou undefined)
    const getApprenticeshipError = () =>
        nbApprenticeship < 0 ? "Vous ne pouvez pas avoir un nombre d'alternance négatif" : undefined;

    const getInternshipError = () =>
        nbInternships < 0 ? "Vous ne pouvez pas avoir un nombre de stage négatif" : undefined;

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        // Marquer tous les champs comme touchés
        setTouched({nbApprenticeship: true, nbInternships: true});
        // Ne soumet que si pas d'erreurs
        if (!getApprenticeshipError() && !getInternshipError()) {
            onSubmit({nbApprenticeship, nbInternships, specialty, preferedCities});
        }
    };


    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 rounded-lg">
            <CustomBasicInput
                id="nbApprenticeship"
                name="nbApprenticeship"
                description="Nombre d'alternances: "
                type="number"
                value={nbApprenticeship}
                onChange={(e) => setNbApprenticeship(Number(e.target.value))}
                onBlur={() => setTouched({...touched, nbApprenticeship: true})}
                error={getApprenticeshipError()}
                touched={touched.nbApprenticeship}
            />

            <CustomBasicInput
                id="nbInternships"
                name="nbInternships"
                description="Nombre de stages: "
                type="number"
                value={nbInternships}
                onChange={(e) => setNbInternships(Number(e.target.value))}
                onBlur={() => setTouched({...touched, nbInternships: true})}
                error={getInternshipError()}
                touched={touched.nbInternships}
            />

            <div className="bg-[#E5E7EB] p-4 rounded-xl">
                <SpecialityForm specialty={specialty} setSpecialty={setSpecialty}/>
            </div>
            <PreferedTowns></PreferedTowns>

            <button type="submit">Envoyer</button>
        </form>
    );
}