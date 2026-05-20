import {z} from "zod";

export const PreferenceZod = z.object({
    id: z.number().int().optional(),
    userId: z.number().int().optional(),
    key: z.string().optional(),
    value: z.string().optional(),
    createdAt: z.string().optional(),
    updatedAt: z.string().optional(),
});

export type Preference = z.infer<typeof PreferenceZod>;