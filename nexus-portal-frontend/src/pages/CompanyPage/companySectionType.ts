export const companySections = [
    "Accueil",
    "Membres",
    "Offres",
    "Collaborations",
] as const;

export type CompanySection = typeof companySections[number];

export function isCompanySection(value: string): value is CompanySection {
    return companySections.includes(value as CompanySection);
}