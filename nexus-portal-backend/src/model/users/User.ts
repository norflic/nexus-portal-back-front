import zod from "zod";
import {DataTypes, Model} from 'sequelize'
import ConnectionInstance from '../../database/Connection.js';

const sequelize = ConnectionInstance.getInstance();

export const UserZod = zod.object({
    id: zod.number(),
    firstname: zod.string(),
    lastname: zod.string(),
    email: zod.email(),
    tel: zod.string(),
    password: zod.string(),
    user_type: zod.enum(["secretary", "year_manager", "cursus_manager", "student", "teacher", "company_member"]).optional().nullable(),
    is_admin: zod.boolean().default(false),
    managed_year: zod.string().nullable().optional(),
    student_status: zod.enum(['intern', 'apprentice']).nullable().optional(),
    company_id: zod.number().nullable().optional(),
    settings_id: zod.number().optional(),
    job_title: zod.string().nullable().optional(),
    class_group: zod.string().nullable().optional(),
    cursus: zod.enum(['RA', 'DACS', 'AGED']).nullable().optional(),
    year: zod.number().nullable().optional()
});
export const CreateUserZod = UserZod.omit({id: true});
export const PartialUserZod = UserZod.partial();

export type User = zod.infer<typeof UserZod>;
export type CreateUser = zod.infer<typeof CreateUserZod>;
export type PartialUser = zod.infer<typeof PartialUserZod>;
export type UserModel = Model<User, CreateUser>

export const UserSequelize = sequelize.define<UserModel>(
    'User',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        firstname: DataTypes.STRING,
        lastname: DataTypes.STRING,
        email: DataTypes.STRING,
        tel: DataTypes.STRING,
        password: DataTypes.STRING,
        is_admin: DataTypes.BOOLEAN,
        user_type: DataTypes.ENUM("secretary", "year_manager", "cursus_manager", "student", "teacher", "company_member"),
        company_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        managed_year: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        class_group: {
            type: DataTypes.STRING,
            allowNull: true
        },
        cursus: {
            type: DataTypes.ENUM('RA', 'DACS', 'AGED'),
            allowNull: true
        },
        job_title: {
            type: DataTypes.STRING,
            allowNull: true
        },
        year: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        student_status: {
            type: DataTypes.ENUM('intern', 'apprentice'),
            allowNull: true
        }
    }
);

// UserSequelize.sync();
