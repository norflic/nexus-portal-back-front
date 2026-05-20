import zod from "zod";
import { DataTypes, Model } from "sequelize";
import ConnectionInstance from "../database/Connection.js";

const sequelize = ConnectionInstance.getInstance();

export const TagZod = zod.object({
    id: zod.number(),
    name: zod.string(),
});
export const CreateTagZod = TagZod.omit({ id: true });
export const PartialTagZod = TagZod.partial();

export type Tag = zod.infer<typeof TagZod>;
export type CreateTag = zod.infer<typeof CreateTagZod>;
export type PartialTag = zod.infer<typeof PartialTagZod>;

export type TagModel = Model<Tag, CreateTag>;
export const TagSequelize = sequelize.define<TagModel>("Tag", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: DataTypes.STRING,
});

// TagSequelize.sync();
