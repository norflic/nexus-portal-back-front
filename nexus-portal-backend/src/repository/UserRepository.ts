import ConnectionInstance from "../database/Connection.js";
import {OfferSequelize} from "../model/Offer.js";
import {SettingsSequelize} from "../model/Settings.js";
import {CreateUser, PartialUser, User, UserSequelize} from "../model/users/User.js";
import PasswordService from "../services/PasswordService.js";
import {cleanObject} from "../utils/cleanObject.js";

const sequelize = ConnectionInstance.getInstance();

async function getUserById(id: number) {
    return UserSequelize.findByPk(id);
}

async function getUserByEmail(email: string) {
    return UserSequelize.findOne({
        where: {
            email: email,
        },
    });
}

async function getAllUsers() {
    return UserSequelize.findAll();
}

async function updateUserById(usr: PartialUser) {
    const { id, ...user } = usr;
    const cleaned = cleanObject(user);

    return UserSequelize.update(cleaned, {
        where: {
            id: usr.id,
        },
    });
}

async function updateUserByEmail(usr: PartialUser) {
    const { id, ...user } = usr;
    const cleaned = cleanObject(user);

    return UserSequelize.update(cleaned, {
        where: {
            email: usr.email,
        },
    });
}

async function deleteUserById(id: number) {
    return UserSequelize.destroy({
        where: {
            id: id,
        },
    });
}

async function deleteUserByEmail(email: string) {
    return UserSequelize.destroy({
        where: {
            email: email,
        },
    });
}

async function createUser(userData: User | CreateUser) {
  // here Sequelize objects are used raw instead of repos to allow transactions
  // without changing repos' design

  userData.password = await PasswordService.hashPassword(userData.password);
  return await sequelize.transaction(async (t) => {
    const settings = await SettingsSequelize.create({}, { transaction: t });

    const user = await UserSequelize.create(
      { ...userData, settings_id: settings.dataValues.id },
      { transaction: t }
    );

      return user;
  });
}

async function getAllPipelineSteps(uid: number) {
    return UserSequelize.findAll({
        where: {
            id: uid,
        },
        include: OfferSequelize,
    });
}

const UserRepository = {
    getUserById,
    getUserByEmail,
    getAllUsers,
    getAllPipelineSteps,
    createUser,
    deleteUserByEmail,
    deleteUserById,
    updateUserByEmail,
    updateUserById,
};

export default UserRepository;
