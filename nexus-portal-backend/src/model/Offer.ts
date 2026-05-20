import {BelongsToManyAddAssociationMixin, BelongsToManyGetAssociationsMixin, DataTypes, Model,} from "sequelize";
import zod from "zod";
import ConnectionInstance from "../database/Connection.js";
import {TagModel, TagZod} from "./Tag.js";

const sequelize = ConnectionInstance.getInstance();

export const OfferZod = zod.object({
    id: zod.number(),
    title: zod.string(),
    salary: zod.float64(),
    type: zod.enum(["internship", "work-study", "permanent", "fixed-term"]),
    company_name: zod.string(),
    description: zod.string(),
    offer_link: zod.string(),
    date_posted: zod.coerce.date(),
    address: zod.string(),
    week_amount: zod.number(),
    validation_level: zod.enum(["validated", "to-validate", "not-validated"]),
    nb_apply: zod.number(),
});

export const OfferWithTagsZod = OfferZod.extend({ tags: zod.array(TagZod) });

export const CreateOfferZod = OfferZod.omit({ id: true });

export const CreateOfferWithTagsZod = CreateOfferZod.extend({
    tags: zod.array(zod.number()),
});

export const UpdateOfferZod = CreateOfferZod.partial().and(
    zod.object({
        id: zod.number(),
    }),
);

export type Offer = zod.infer<typeof OfferZod>;
export type OfferWithTags = zod.infer<typeof OfferWithTagsZod>;
export type CreateOffer = zod.infer<typeof CreateOfferZod>;
export type CreateOfferWithTags = zod.infer<typeof CreateOfferWithTagsZod>;
export type UpdateOfferZod = zod.infer<typeof UpdateOfferZod>;

type _OfferModel = Model<Offer, CreateOffer>;
type _OfferWithTagsModel = Model<OfferWithTags, CreateOfferWithTags>;
type _Mixins = {
    getTags: BelongsToManyGetAssociationsMixin<TagModel>;
    addTag: BelongsToManyAddAssociationMixin<TagModel, number>;
    addTags: BelongsToManyAddAssociationMixin<TagModel[], number[]>;
};

export type OfferModel = _OfferModel & _Mixins;
export type OfferWithTagsModel = _OfferWithTagsModel & _Mixins;

export const OfferSequelize = sequelize.define<_OfferModel>("Offer", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: DataTypes.STRING,
    salary: DataTypes.FLOAT,
    offer_link: DataTypes.STRING,
    type: DataTypes.ENUM("internship", "work-study", "permanent", "fixed-term"),
    company_name: DataTypes.STRING,
    description: DataTypes.STRING,
    date_posted: DataTypes.DATE,
    address: DataTypes.STRING,
    week_amount: DataTypes.INTEGER,
    validation_level: DataTypes.ENUM("validated", "to-validate", "not-validated"),
    nb_apply: DataTypes.INTEGER,
});

// OfferSequelize.sync();

