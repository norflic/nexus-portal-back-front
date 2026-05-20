import { NexusPortalException } from "../types/Exceptions.js";

const NotFoundException = (model: string, itemType: string, itemValue: string): NexusPortalException => {
    return { message: `No ${model} found with ${itemType} : ${itemValue}` }
}

const InvalidLogin = () => {
    return { message: `The email or password provided is incorrect` }
}

const UserWithThisEmailExists = () => {
    return { message: 'A user with this email already exists ! Please choose another one, or reset your password if needed.' }
}

export {
    NotFoundException,
    InvalidLogin,
    UserWithThisEmailExists
}