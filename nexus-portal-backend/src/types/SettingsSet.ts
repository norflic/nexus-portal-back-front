import zod from 'zod';

const SettingsSetSchema = zod.object({
    theme: zod.enum(["dark", "light", "system"]).nullable(),
    landing_page: zod.enum(["offers", "profile", "pipeline"]).default("profile").nullable()
});

const SettingsSetPatchSchema = SettingsSetSchema.partial();

export type SettingsSet = zod.infer<typeof SettingsSetSchema>;
export type SettingsSetPartial = zod.infer<typeof SettingsSetPatchSchema>;

export const SettingsSchema = {
    SettingsSetSchema,
    SettingsSetPatchSchema,
}