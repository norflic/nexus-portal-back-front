import {z} from "zod";

export const ClassGroupZod = z.object({
    id: z.number().int().optional(),
    name: z.string().optional(),
    year: z.number().int().optional(),
    description: z.string().optional(),
    createdAt: z.string().optional(),
    updatedAt: z.string().optional(),
});

export type ClassGroup = z.infer<typeof ClassGroupZod>;