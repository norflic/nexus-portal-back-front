import ConnectionInstance from "../database/Connection.js";
import { DataTypes } from "sequelize";

const sequelize = ConnectionInstance.getInstance();

export const OfferTagsSequelize = sequelize.define("Offer_Tags", {
    offer_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    tag_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});
