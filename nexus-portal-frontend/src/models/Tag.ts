import zod from "zod";

export const TagZod = zod.object({
    id: zod.number(),
    name: zod.string(),
});
export const CreateTagZod = TagZod.omit({ id: true });

export type Tag = zod.infer<typeof TagZod>;
export type CreateTag = zod.infer<typeof CreateTagZod>;
