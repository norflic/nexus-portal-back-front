import zod from 'zod';
import { SettingsSchema } from './SettingsSet.js';

const UserSettingsSchema = zod.object({
    user_id: zod.number(),
    is_admin: zod.boolean(),
    settings: SettingsSchema.SettingsSetSchema
});

export type UserSettings = zod.infer<typeof UserSettingsSchema>;