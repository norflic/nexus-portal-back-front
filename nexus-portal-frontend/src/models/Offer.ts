import zod from "zod";

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

export const OfferWithTagsZod = OfferZod.extend({
    tags: zod.array(zod.object({
        id: zod.number(),
        name: zod.string(),
    }))
});

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
