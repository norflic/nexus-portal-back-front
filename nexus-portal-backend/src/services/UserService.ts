import ResponseService from "./ResponseService.js";
import {InvalidLogin, NotFoundException, UserWithThisEmailExists,} from "../exceptions/AuthExceptions.js";
import PasswordService from "./PasswordService.js";
import {NexusPortalResponse} from "../types/Responses.js";
import {CreateUser, User} from "../model/users/User.js";
import UserRepository from "../repository/UserRepository.js";
import {LoginModel} from "../interfaces/LoginModel.js";
import {UserNotFound} from "../exceptions/UserExceptions.js";

const login = async (
    providedUser: LoginModel,
): Promise<NexusPortalResponse<Omit<User, "password">>> => {
    const existingUser = await UserRepository.getUserByEmail(
        providedUser.email,
    );

    if (!existingUser) {
        // 404
        return ResponseService.makeFailureResponse(NotFoundException("User", "email", providedUser.email || ''));
    }

    const { password, ...filteredUser } = existingUser.dataValues
    const isPasswordMatching = await PasswordService.verifyPassword(providedUser.password, password);
    return isPasswordMatching ? ResponseService.makeSuccessResponse(filteredUser) // 200
        : ResponseService.makeFailureResponse(InvalidLogin());
}

const signup = async (
    providedUser: CreateUser,
): Promise<NexusPortalResponse<Omit<User, "password">>> => {
    const existingUser = await UserRepository.getUserByEmail(
        providedUser.email,
    );

    if (existingUser) {
        return ResponseService.makeFailureResponse(UserWithThisEmailExists()) // 400
    }

    providedUser.password = await PasswordService.hashPassword(
        providedUser.password,
    );
    const new_user = await UserRepository.createUser(providedUser);

    const { password, ...filteredUser } = new_user.dataValues;

    return ResponseService.makeSuccessResponse(filteredUser); // 200
}

const getOne = async (
    id: number,
): Promise<NexusPortalResponse<Omit<User, "password">>> => {
    const usr = await UserRepository.getUserById(id);

    if (usr) {
        const { password, ...filteredUser } = usr.dataValues
        return ResponseService.makeSuccessResponse(filteredUser); // 200
    } else {
        return ResponseService.makeFailureResponse(UserNotFound(id.toString())); // 404
    }
};

const getOneByEmail = async (
    email: string,
): Promise<NexusPortalResponse<Omit<User, "password">>> => {
    const usr = await UserRepository.getUserByEmail(email);

    if (usr) {
        const { password, ...filteredUser } = usr.dataValues
        return ResponseService.makeSuccessResponse(filteredUser); // 200
    } else {
        return ResponseService.makeFailureResponse(UserNotFound(email)); // 404
    }
};

const getAll = async () => {
    const users = await UserRepository.getAllUsers();
    return users.map((user) => {
        const {password, ...filteredUser} = user.dataValues;
        return filteredUser;
    });
};

const getAllPipelineSteps = async (id: number) => {
    return UserRepository.getAllPipelineSteps(id);
}

const UserService = {
    login,
    signup,
    getOne,
    getOneByEmail,
    getAll,
    getAllPipelineSteps
};

export default UserService;
