import zod from 'zod';
import ConnectionInstance from '../database/Connection.js';
import {DataTypes, Model} from 'sequelize';
import {CompanyZod} from './Company.js';
import {CreateUserZod} from './users/User.js';

const sequelize = ConnectionInstance.getInstance();

export const DefenseZod = zod.object({
    id: zod.number(),
    date: zod.coerce.date(),
    company_id: zod.number(),
    room: zod.string(),
    student_id: zod.number(),
    company_member_id: zod.number(),
    candid_teacher_id: zod.number(),
    tech_teacher_id: zod.number(),
    hour_start: zod.string(),
    hour_end: zod.string()
});

export const DefenseCascadeZod = zod.object({
    id: zod.number(),
    date: zod.coerce.date(),
    company: zod.nullable(CompanyZod),
    room: zod.string(),
    student: zod.nullable(CreateUserZod),
    company_member: zod.nullable(CreateUserZod),
    candid_teacher: zod.nullable(CreateUserZod),
    tech_teacher: zod.nullable(CreateUserZod),
    hour_start: zod.string(),
    hour_end: zod.string()
});

export const CreateDefenseZod = DefenseZod.omit({id: true});
export const PartialDefenseZod = DefenseZod.partial();

/**
 * @author Mael
 * @description Defense -> Soutenance
 */
export type Defense = zod.infer<typeof DefenseZod>;
export type CreateDefense = zod.infer<typeof CreateDefenseZod>;
export type PartialDefense = zod.infer<typeof PartialDefenseZod>;
export type DefenseCascade = zod.infer<typeof DefenseCascadeZod>;
export type DefenseModel = Model<Defense, CreateDefense>;

export const DefenseSequelize = sequelize.define<DefenseModel>(
    'Defense',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        hour_start: DataTypes.TIME,
        hour_end: DataTypes.TIME,
        room: DataTypes.STRING,
        date: DataTypes.DATE,
        company_id: DataTypes.INTEGER,
        student_id: DataTypes.INTEGER,
        company_member_id: DataTypes.INTEGER,
        candid_teacher_id: DataTypes.INTEGER,
        tech_teacher_id: DataTypes.INTEGER
    }
);

// DefenseSequelize.sync();
