export type AdminResourceConfig = {
    name: string;
    label: string;
    singularPath: string;
    pluralPath: string;
};

export const adminResources: AdminResourceConfig[] = [
    {
        name: "applications",
        label: "Applications",
        singularPath: "application",
        pluralPath: "applications",
    },
    {
        name: "classgroups",
        label: "ClassGroups",
        singularPath: "classgroup",
        pluralPath: "classgroups",
    },
    {
        name: "companies",
        label: "Companies",
        singularPath: "company",
        pluralPath: "companies",
    },
    {
        name: "defenses",
        label: "Defenses",
        singularPath: "defense",
        pluralPath: "defenses",
    },
    {
        name: "files",
        label: "Files",
        singularPath: "file",
        pluralPath: "files",
    },
    {
        name: "offers",
        label: "Offers",
        singularPath: "offer",
        pluralPath: "offers",
    },
    {
        name: "pipelinesteps",
        label: "PipelineSteps",
        singularPath: "pipelinestep",
        pluralPath: "pipelinesteps",
    },
    {
        name: "preferences",
        label: "Preferences",
        singularPath: "preference",
        pluralPath: "preferences",
    },
    {
        name: "tags",
        label: "Tags",
        singularPath: "tag",
        pluralPath: "tags",
    },
];

export const adminResourceByName = new Map(
    adminResources.map((resource) => [resource.name, resource]),
);
