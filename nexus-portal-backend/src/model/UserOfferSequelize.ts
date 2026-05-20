import ConnectionInstance from "../database/Connection.js";
import { DataTypes, Model } from "sequelize";
import { OfferSequelize } from "./Offer.js";
import { UserSequelize } from "./users/User.js";

const sequelize = ConnectionInstance.getInstance();

const userOfferStatus = ["refused", "waiting", "interview", "accepted"] as const;

export type UserOfferStatus = (typeof userOfferStatus)[number] | null;
export type UserOffer = {
    user_id: number;
    offer_id: number;
    userStatus: UserOfferStatus;
};
export type UserOfferModel = Model<UserOffer>;
export const UserOfferSequelize = sequelize.define<UserOfferModel>("User_Offer", {
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: UserSequelize,
            key: "id",
        },
    },
    offer_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: OfferSequelize,
            key: "id",
        },
    },
    userStatus: {
        type: DataTypes.ENUM(...userOfferStatus),
        allowNull: true,
    },
});

