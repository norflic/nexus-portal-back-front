import type {User} from "../model/users/User.js";

declare global {
    namespace Express {
        interface Request {
            user?: User;
        }
    }
}

export {};

