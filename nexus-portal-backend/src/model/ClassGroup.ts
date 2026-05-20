import zod from 'zod';
import { DataTypes, Model } from 'sequelize';
import ConnectionInstance from '../database/Connection.js';

const sequelize = ConnectionInstance.getInstance();

export const ClassGroupZod = zod.object({
    id: zod.number(),
    name: zod.string()
});

export const CreateClassGroupZod = ClassGroupZod.omit({id: true});
export const PartialClassGroupZod = ClassGroupZod.partial();

export type CreateClassGroup = zod.infer<typeof CreateClassGroupZod>;
export type ClassGroup = zod.infer<typeof ClassGroupZod>;
export type PartialClassGroup = zod.infer<typeof PartialClassGroupZod>;
export type ClassGroupModel = Model<ClassGroup, CreateClassGroup>;

export const ClassGroupSequelize = sequelize.define<ClassGroupModel>(
    'ClassGroup',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: DataTypes.STRING
    }
);

// TagSequelize.sync();