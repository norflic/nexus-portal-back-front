import {z} from "zod";

export const ApplicationZod = z.object({
    id: z.number().int().optional(),
    applicantId: z.number().int().optional(),
    offerId: z.number().int().optional(),
    state: z.string().optional(),
    notes: z.string().optional(),
    createdAt: z.string().optional(),
    updatedAt: z.string().optional(),
});

export type Application = z.infer<typeof ApplicationZod>;