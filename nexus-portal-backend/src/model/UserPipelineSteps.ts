import { DataTypes } from "sequelize";
import ConnectionInstance from "../database/Connection.js";
import { UserSequelize } from "./users/User.js";
import { PipelineStepSequelize } from "./PipelineStep.js";

const sequelize = ConnectionInstance.getInstance();

export const UserPipelineSteps = sequelize.define('UserPipelineSteps', {
    user_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
            model: UserSequelize,
            key: "id"
        }
    },
    step_id: {
        allowNull: false, 
        type: DataTypes.INTEGER,
        references: {
            model: PipelineStepSequelize,
            key: "id"
        }
    }
});