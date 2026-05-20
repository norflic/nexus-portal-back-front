import z from "zod";

export type CompanyType = z.infer<typeof CompanyZod>

export const CompanyZod = z.object({
    id: z.number(),
    name: z.string(),
    email: z.email(),
    tel: z.string(),
    description: z.string(),
    street_nb: z.number(),
    street_name: z.string(),
    city_name: z.string(),
    postal_code: z.number(),
    website: z.string(),
    createdAt: z.string().optional(),
    updatedAt: z.string().optional(),
});
export const CreateCompanyZod = CompanyZod.omit({id: true});
