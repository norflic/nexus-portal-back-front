import {NextFunction, Request, Response} from "express"
import UserService from "../services/UserService.js"
import {LoginModelZod} from "../interfaces/LoginModel.js"
import type {User} from "../model/users/User.js";
import {CreateUserZod} from "../model/users/User.js";
import ResponseService from "../services/ResponseService.js";
import {BadRequest} from "../utils/HttpErrors.js";

const { makeSuccessResponse, makeFailureResponse } = ResponseService;

const setConnectedUserHeaders = (
    res: Response,
    user: Pick<User, "email" | "is_admin"> & Partial<Pick<User, "id" | "user_type">>,
) => {
    if (user.id != null) {
        res.setHeader("X-User-Id", String(user.id));
    }

    res.setHeader("X-User-Email", user.email);

    if (user.user_type != null) {
        res.setHeader("X-User-Type", user.user_type);
    }

    res.setHeader("X-User-Is-Admin", String(Boolean(user.is_admin)));
};

/**
 * Logs in the user if his email and password match what is in the db
 */
const loginHandler = async (req: Request, res: Response, next: NextFunction) => {
    const user = LoginModelZod.safeParse(req.body["data"]);

    if (user.success) {
        const loginResult = await UserService.login(user.data);
        if (loginResult.ok) {
            setConnectedUserHeaders(res, loginResult.data);
        }
        res.status(200).send(makeSuccessResponse(loginResult));
        return next();
    } else {
        res.status(401).send(makeFailureResponse(BadRequest(user.error)));
        return next();
    }

}

const signupHandler = async (req: Request, res: Response, next: NextFunction) => {
    const user = CreateUserZod.safeParse(req.body["data"]);

    if(user.success) {
        const signupResult = await UserService.signup(user.data);
        if (signupResult.ok) {
            setConnectedUserHeaders(res, signupResult.data);
        }
        res.status(200).send(makeSuccessResponse(signupResult));
        return next();
    } else {
        res.status(401).send(makeFailureResponse(BadRequest(user.error)));
        return next();
    }
}

const AuthController = {
    loginHandler,
    signupHandler
}

export default AuthController
