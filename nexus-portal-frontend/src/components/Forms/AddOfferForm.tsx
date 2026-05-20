import {useState} from "react";
import CustomBasicInput from "./FormsComponents/CustomBasicInput.tsx";
import {
    type AddOfferFormValues,
    ContractType,
    type Duration,
    type UniteDuree,
    type VisibilityType
} from "./AddOfferFormValues.ts";
import ChoixDuree from "./FormsComponents/ChoixDuree.tsx";

interface AddOfferFormProps {
    onSubmit: (formvalue: AddOfferFormValues) => void;
    company_name?: string;  // dans le cas ou le companyName est fourni, il devrait être fixe dans le formulaire
}

export default function AddOfferForm({onSubmit}: AddOfferFormProps) {
    const [salary, setSalary] = useState<number>(0);
    const [title, setTitle] = useState<string>("");
    const [type, setType] = useState<string>(ContractType.stage.toString());
    const [visibility, setVisibility] = useState<VisibilityType>("PUBLIC");
    const [companyName, setCompanyName] = useState<string>("");
    const [description, setDescription] = useState<string>("");

    const [durationQuantity, setDurationQuantity] = useState<number>(0);
    const [durationUnit, setDurationUnit] = useState<UniteDuree>("semaine");


    const [touched, setTouched] = useState({
        title: false,
        visibility: false,
        durationQuantity: false,
        salary: false,
        companyName: false,
        description: false,
    });

    // Fonctions de validation qui retournent le message d'erreur (ou undefined)
    const getTitleError = () =>
        title == "" ? "Le titre de l'offre est requis" : undefined;

    const getSalaryError = () =>
        salary <= 0 ? "Le salaire est requis" : undefined;

    const getCompanyNameError = () =>
        companyName == "" ? "Le nom de l'entreprise est requis" : undefined;

    const getDescriptionError = () =>
        description == "" ? "La description est requise" : undefined;

    const getQuantityError = () =>
        durationQuantity == 0 ? "La durée est requise" : undefined;

    const getUnitError = () =>
        undefined;

    function formHasError(): boolean {
        return !!(getTitleError() && getSalaryError() && getCompanyNameError() && getDescriptionError() && getQuantityError() && getUnitError())
    }

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        // Marquer tous les champs comme touchés
        setTouched({
            title: true,
            visibility: true,
            durationQuantity: true,
            salary: true,
            companyName: true,
            description: true
        });

        if (!formHasError()) {
            const duration: Duration = {
                quantite: durationQuantity,
                unite: durationUnit
            };

            onSubmit({
                authorID: "0",
                title,
                salary,
                type,
                companyName,
                visibility: visibility,
                description,
                tags: [],
                date: new Date(),
                validationLevel: [],
                nbApply: 0,
                status: true,
                duration
            });
        }
    };


    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 rounded-lg">

            <CustomBasicInput
                id="title"
                name="title"
                description="Titre de l'offre: "
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onBlur={() => setTouched({...touched, title: true})}
                error={getTitleError()}
                touched={touched.title}
            />

            <CustomBasicInput
                id="companyName"
                name="companyName"
                description="Nom de l'entreprise: "
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                onBlur={() => setTouched({...touched, companyName: true})}
                error={getCompanyNameError()}
                touched={touched.companyName}
            />

            <ChoixDuree
                id="duration"
                name="duration"
                description="Durée du contrat: "
                durationQuantity={durationQuantity}
                durationUnit={durationUnit}
                onQuantityChange={(value) => setDurationQuantity(value)}
                onUnitChange={(value) => setDurationUnit(value)}
                error={getQuantityError()}
                touched={touched.durationQuantity}
            />

            <CustomBasicInput
                id="salary"
                name="salary"
                description="Salaire (par mois): "
                type="number"
                value={salary.toString()}
                onChange={(e) => setSalary(Number(e.target.value))}
                onBlur={() => setTouched({...touched, salary: true})}
                error={getSalaryError()}
                touched={touched.salary}
                inputSuffix=" €"
            />

            <div className="flex flex-col gap-2">
                <label htmlFor="type">Type de contrat: </label>
                <select
                    id="type"
                    name="type"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="border rounded px-2 py-1"
                >
                    <option value="CDI">CDI</option>
                    <option value="CDD">CDD</option>
                    <option value="stage">Stage</option>
                    <option value="alternance">Alternance</option>
                </select>
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="visibility">Visibilité: </label>
                <select
                    id="visibility"
                    name="visibility"
                    value={visibility}
                    onChange={(e) => setVisibility(e.target.value as VisibilityType)}
                    className="border rounded px-2 py-1"
                >
                    <option value="PRIVATE">Privée</option>
                    <option value="PUBLIC">Publique</option>
                </select>
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="description">Description: </label>
                <textarea
                    id="description"
                    name="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    onBlur={() => setTouched({...touched, description: true})}
                    className="border rounded px-2 py-1 min-h-24"
                />
                {touched.description && getDescriptionError() && (
                    <span className="text-red-500 text-sm">{getDescriptionError()}</span>
                )}
            </div>

            <button type="submit">Envoyer</button>
        </form>
    );
}