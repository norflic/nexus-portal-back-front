import {z} from "zod";

export const UserTypeZod = z.object({
    id: z.number().int().optional(),
    name: z.string().optional(),
    description: z.string().optional(),
    createdAt: z.string().optional(),
    updatedAt: z.string().optional(),
});

export type UserType = z.infer<typeof UserTypeZod>;