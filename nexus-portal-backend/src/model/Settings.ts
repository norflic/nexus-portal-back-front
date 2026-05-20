import { DataTypes } from "sequelize";
import ConnectionInstance from "../database/Connection.js";

const sequelize = ConnectionInstance.getInstance();

export const SettingsSequelize = sequelize.define('Settings', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    theme: {
        type: DataTypes.ENUM('dark', 'light', 'system'),
        allowNull: true
    },
    landing_page: {
        type: DataTypes.ENUM('student_dashboard', 'offers', 'profile', 'pipeline'),
        allowNull: true
    }
});