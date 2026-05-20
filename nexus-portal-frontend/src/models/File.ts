import {z} from "zod";

export const FileZod = z.object({
    id: z.number().int().optional(),
    filename: z.string().optional(),
    path: z.string().optional(),
    mimeType: z.string().optional(),
    size: z.number().optional(),
    uploadedBy: z.number().int().optional(),
    createdAt: z.string().optional(),
    updatedAt: z.string().optional(),
});

export type File = z.infer<typeof FileZod>;