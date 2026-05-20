
import zod from 'zod'
import { DataTypes, Model } from 'sequelize';
import ConnectionInstance from '../database/Connection.js';

const sequelize = ConnectionInstance.getInstance();

export const CompanyZod = zod.object({
    id: zod.number(),
    name: zod.string(),
    email: zod.email(),
    tel: zod.string(),
    description: zod.string(),
    street_nb: zod.number(),
    street_name: zod.string(),
    city_name: zod.string(),
    postal_code: zod.number(),
    website: zod.string()
});
export const CreateCompanyZod = CompanyZod.omit({id: true});
export const PartialCompanyZod = CompanyZod.partial();

export type Company = zod.infer<typeof CompanyZod>;
export type CreateCompany = zod.infer<typeof CreateCompanyZod>;
export type PartialCompany = zod.infer<typeof PartialCompanyZod>;
export type CompanyModel = Model<Company, CreateCompany>

export const CompanySequelize = sequelize.define<CompanyModel>(
    'Company',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        website: DataTypes.STRING,
        tel: DataTypes.STRING,
        description: DataTypes.STRING,
        street_nb: DataTypes.INTEGER,
        street_name: DataTypes.STRING,
        city_name: DataTypes.STRING,
        postal_code: DataTypes.INTEGER
    }
)

// CompanySequelize.sync();