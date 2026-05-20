import {z} from "zod";

export const CursusTypeZod = z.object({
    id: z.number().int().optional(),
    name: z.string().optional(),
    description: z.string().optional(),
    createdAt: z.string().optional(),
    updatedAt: z.string().optional(),
});

export type CursusType = z.infer<typeof CursusTypeZod>;