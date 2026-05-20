
import zod from 'zod';
import ConnectionInstance from '../database/Connection.js';
import { DataTypes, Model } from 'sequelize';
import { UserSequelize } from './users/User.js';

const sequelize = ConnectionInstance.getInstance();

export const FileZod = zod.object({
    id: zod.number(),
    extension: zod.string(),
    user_id: zod.number().nullable().optional(),
    name: zod.string(),
    path: zod.string()
});
export const CreateFileZod = FileZod.omit({id: true});
export const PartialFileZod = FileZod.partial();

export type File = zod.infer<typeof FileZod>;
export type CreateFile = zod.infer<typeof CreateFileZod>;
export type PartialFile = zod.infer<typeof PartialFileZod>;
export type FileModel = Model<File, CreateFile>;

export const FileSequelize = sequelize.define<FileModel>(
    "File",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: UserSequelize
            }
        },
        name: DataTypes.STRING,
        path: DataTypes.STRING,
        extension: DataTypes.STRING
    }
)

// FileSequelize.sync();