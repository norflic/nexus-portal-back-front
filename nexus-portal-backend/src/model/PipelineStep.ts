
import zod from 'zod';
import { DataTypes } from 'sequelize';
import ConnectionInstance from '../database/Connection.js';
import { FileSequelize } from './File.js';
import { UserSequelize } from './users/User.js';
import { ApplicationStateSequelize } from './ApplicationState.js';

const sequelize = ConnectionInstance.getInstance();

export const PipelineStepZod = zod.object({
    id: zod.number(),
    step_nb: zod.number(),
    validated: zod.boolean(),
    description: zod.string(),
    files_ids: zod.array(zod.number())
});
export const CreatePipelineStepZod = PipelineStepZod.omit({id: true});
export const PartialPipelineStepZod = PipelineStepZod.partial();

export type PipelineStep = zod.infer<typeof PipelineStepZod>;
export type CreatePipelineStep = zod.infer<typeof CreatePipelineStepZod>;
export type PartialPipelineStep = zod.infer<typeof PartialPipelineStepZod>;

export const PipelineStepSequelize = sequelize.define(
    'Pipeline_Step',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: DataTypes.STRING,
        step_nb: DataTypes.INTEGER,
        validated: DataTypes.BOOLEAN,
        description: DataTypes.STRING,
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: UserSequelize
            }
        }
    }
);

// PipelineStepSequelize.sync();