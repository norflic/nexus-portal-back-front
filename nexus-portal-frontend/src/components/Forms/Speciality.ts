export const SPECIALITIES_LIST = [
    {value: "DACS", label: "DACS"},
    {value: "AGED", label: "AGED"},
    {value: "RA", label: "RA"},
    {value: "LICENSE_PRO", label: "Licence Pro"},
] as const;

export type Speciality = typeof SPECIALITIES_LIST[number]["value"];