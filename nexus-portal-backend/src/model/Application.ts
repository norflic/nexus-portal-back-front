
import zod from 'zod';
import ConnectionInstance from '../database/Connection.js';
import { DataTypes, Model } from 'sequelize';

const sequelize = ConnectionInstance.getInstance();

export const ApplicationZod = zod.object({
    id: zod.number(),
    user_id: zod.number(),
    offer_id: zod.number(),
    application_state: zod.number(),
    createdAt: zod.date(),
    updatedAt: zod.date()
});
export const CreateApplicationZod = ApplicationZod.omit({id: true});
export const PartialApplication = ApplicationZod.partial();

export type Application = zod.infer<typeof ApplicationZod>;
export type CreateApplication = zod.infer<typeof CreateApplicationZod>;
export type PartialApplication = zod.infer<typeof PartialApplication>;
export type ApplicationModel = Model<Application, PartialApplication>;

export const ApplicationSequelize = sequelize.define(
    'Application',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true        
        },
        application_state: DataTypes.ENUM("not-applied-yet", "re-apply", "waiting"),
        offer_id: DataTypes.INTEGER
    }
)

// ApplicationSequelize.sync();