import type {Speciality} from "./Speciality.ts";

export interface PreferencesFormValues {
    nbApprenticeship: number;
    nbInternships: number;
    specialty: Speciality[];
    preferedCities: string[];
}