import zod from "zod";
import { DataTypes, Model } from "sequelize";
import ConnectionInstance from "../database/Connection.js";

const sequelize = ConnectionInstance.getInstance();

export const ApplicationStateZod = zod.object({
    id: zod.number(),
    name: zod.string(),
});
export const PartialApplicationStateZod = ApplicationStateZod.partial();
export const CreateApplicationStateZod = ApplicationStateZod.omit({ id: true });

export type ApplicationState = zod.infer<typeof ApplicationStateZod>;
export type CreateApplicationState = zod.infer<typeof CreateApplicationStateZod>;
export type PartialApplicationState = zod.infer<typeof PartialApplicationStateZod>;
export type ApplicationStateModel = Model<ApplicationState, CreateApplicationState>;

export const ApplicationStateSequelize = sequelize.define<ApplicationStateModel>(
    "ApplicationState",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: DataTypes.STRING,
    },
);
