import UserRepository from "../../repository/UserRepository.js";
import GenericSeed from "./GenericSeed.js";
import DatasetType from "./types/DatasetType.js";
import {Model} from "sequelize";
import {DefenseSequelize} from "../../model/Defense.js";
import DefenseRepository from "../../repository/DefenseRepository.js";

/**
 * @author Mael
 * @description Seeds database from a given dataset. \n
 * To add new seeding data, the steps are : \n
 * - 1. Add a new entry in DatasetType. Use the Createxxx Model to avoid having to specify
 * the id in datasets. the entry should be like such
 * ```ts
 * type DatasetType = {
 *      ...
 *      entry_name: Type[]
 * }
 * ```
 * - 2. Add the dynamic import and the call to SeedAll from SeedAll.ts .
 * Refer to existing imports to do it right.
 *
 * - 3. [If you need to use an existing Repo's create / a custom creation routine] :
 * pass a callback as a third parameter to the GenericSeed call.
 *
 * - 4. You are done, re-run the project, eventually tear down existing volumes if on a dev build.
 */
export default async function SeedAll(dataset: DatasetType) {
    // 1. No dependencies
    const { CompanySequelize } = await import('../../model/Company.js');
    const seededCompanies = await GenericSeed(CompanySequelize, dataset.company);

    const { ClassGroupSequelize } = await import('../../model/ClassGroup.js');
    const seededClassGroups = await GenericSeed(ClassGroupSequelize, dataset.classgroups);

    const { TagSequelize } = await import('../../model/Tag.js');
    await GenericSeed(TagSequelize, dataset.tags);

    const { OfferSequelize } = await import('../../model/Offer.js');
    await GenericSeed(OfferSequelize, dataset.offers);

    // 2. Depends on company + classgroup
    const { UserSequelize } = await import('../../model/users/User.js');
    const usersDataset = dataset.users.map((u) => ({
        ...u,
        company_id: seededCompanies[0]?.dataValues.id, // or map by name if needed
        class_group_id: seededClassGroups.find(
            cg => cg.dataValues.name === u.class_group  // match by name
        )?.dataValues.id
    }));
    const seededUsers = await GenericSeed(UserSequelize, usersDataset, async () => {
        var _return: Model<any, any>[] = [];
        usersDataset.map(async (seeded) => {
            _return.push(await UserRepository.createUser(seeded));
        });
        return _return;
    });

    const defensesDataset = dataset.defense.map((d) => ({
        ...d,
        user_id: seededUsers.find(
            user => user.dataValues.id === d.student_id
        )?.dataValues.id
    }));
    const seededDefenses = await GenericSeed(DefenseSequelize, defensesDataset, async () => {
        var _return: Model<any, any>[] = [];
        defensesDataset.map(async (seeded) => {
            _return.push(await DefenseRepository.createDefense(seeded));
        });
        return _return;
    });

    // 3. Depends on users
    const { FileSequelize } = await import('../../model/File.js');
    const filesDataset = dataset.files.map((f, i) => ({
        ...f,
        user_id: seededUsers[i]?.dataValues.id
    }));
    await GenericSeed(FileSequelize, filesDataset);
}
