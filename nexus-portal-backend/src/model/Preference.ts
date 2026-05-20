import zod from 'zod';
import { DataTypes } from 'sequelize';
import ConnectionInstance from '../database/Connection.js';
import { UserSequelize } from './users/User.js';

const sequelize = ConnectionInstance.getInstance();

export const PreferenceZod = zod.object({ 
    id: zod.number(),
    internship_amount: zod.number(),
    workstudy_amount: zod.number(),
    domains: zod.array(zod.unknown()),
});
export const CreatePreferenceZod = PreferenceZod.omit({id: true});
export const PartialPreferenceZod = PreferenceZod.partial();

export type Preference = zod.infer<typeof PreferenceZod>;
export type CreatePreference = zod.infer<typeof CreatePreferenceZod>;
export type PartialPreference = zod.infer<typeof PartialPreferenceZod>; 

export const PreferenceSequelize = sequelize.define(
    'Preference',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        internship_amount: DataTypes.INTEGER,
        workstudy_amount: DataTypes.INTEGER,
        domains: DataTypes.ARRAY(DataTypes.STRING)
    }
);

// PreferenceSequelize.sync();