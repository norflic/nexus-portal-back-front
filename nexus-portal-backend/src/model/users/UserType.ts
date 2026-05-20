import zod, { Infer } from 'zod';
import { DataTypes } from 'sequelize';
import ConnectionInstance from '../../database/Connection.js';
import { UserSequelize } from './User.js';
import { DefenseSequelize } from '../Defense.js';

const sequelize = ConnectionInstance.getInstance()

export const user_types = ["student", "secretary", "employee", "formation_manager"]

export const UserTypeZod = zod.object({
    id: zod.number(),
    type: zod.string()
})

export type UserType = zod.infer<typeof UserTypeZod>;

export const UserTypeSequelize = sequelize.define('UserType', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    type: DataTypes.STRING
});

// UserTypeSequelize.sync();