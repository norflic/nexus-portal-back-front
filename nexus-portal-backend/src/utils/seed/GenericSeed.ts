import { Model, ModelCtor, Optional } from "sequelize";

/**
 * @author Mael
 * @param model The sequelize model you want to seed.
 * @param dataset The dataset field. It should be an array of objects in the DatasetType 
 * @param cb Function that can be called instead of the default repository's create method.\n
 * It needs to be asynchronous and return a Promise to a list of Sequelize.Model instances.
 * @returns Promise<Model<any, any>[]>
 */
export default function GenericSeed<
    M extends ModelCtor<Model<any, any>>, 
    T extends Omit<any, "id"> | Optional<any, string>
>(model: M, dataset: T[], cb?: () => Promise<Model<any, any>[]>) {
    if (!cb) {
        return Promise.all(dataset.map(data => model.create(data)));
    } else {
        return cb();
    }
}