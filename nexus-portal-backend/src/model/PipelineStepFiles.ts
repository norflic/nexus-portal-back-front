import { DataTypes } from 'sequelize';
import ConnectionInstance from '../database/Connection.js';

const sequelize = ConnectionInstance.getInstance();

export const PipelineStepFilesSequelize = sequelize.define(
    'Pipeline_Step_Files',
    {
        pipeline_step_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        file_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }
);