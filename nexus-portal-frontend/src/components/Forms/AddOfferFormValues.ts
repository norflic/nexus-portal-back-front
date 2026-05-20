export interface AddOfferFormValues {
    title: string;
    authorID: string,
    salary: number;
    type: string;
    companyName: string;
    visibility: VisibilityType;
    description: string;
    date: Date;
    tags: string[];
    status: boolean;
    nbApply: number;
    validationLevel: string[];
    duration: Duration;
}

// @ts-ignore
export const enum ContractType {
    stage,
    alternance,
    CDI,
    CDD
}

export type UniteDuree = "semaine" | "mois" | "jour"

export interface Duration {
    quantite: number;
    unite: UniteDuree;
}

export type VisibilityType = "PRIVATE" | "PUBLIC"