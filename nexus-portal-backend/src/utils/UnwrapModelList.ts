import { Attributes, Model } from "sequelize";

export function UnwrapModelList<M extends Model<any, any> = Model<any, any>>(
    models: M[],
) {
    const array: M["dataValues"] = [];

    models.forEach((m) => {
        const dv = m.dataValues;
        array.push(dv);
    });

    return array;
}
