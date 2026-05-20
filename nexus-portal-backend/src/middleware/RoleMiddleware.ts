import {NextFunction, Request, Response} from "express";
import {User} from "../model/users/User.js";

/**
 * Extension de l'interface Request pour inclure l'utilisateur
 */
declare global {
    namespace Express {
        interface Request {
            user?: Partial<User>;
        }
    }
}

/**
 * Middleware pour extraire les informations utilisateur des headers CORS
 * Vérifie que l'utilisateur est connecté via les headers X-User-*
 */
export const extractUserFromHeaders = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    const userId = req.headers["x-user-id"];
    const userEmail = req.headers["x-user-email"];
    const userType = req.headers["x-user-type"];
    const isAdmin = req.headers["x-user-is-admin"];

    if (userEmail) {
        req.user = {
            id: userId ? Number(userId) : undefined,
            email: String(userEmail),
            user_type: userType ? (String(userType) as any as User["user_type"]) : undefined,
            is_admin: isAdmin === "true",
        } as Partial<User>;
    }

    next();
};

/**
 * Vérifie que l'utilisateur est connecté
 */
export const requireAuth = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    if (!req.user?.email) {
        res.status(401).json({ok: false, error: "Non authentifié"});
        return;
    }
    next();
};

/**
 * Vérifie que l'utilisateur est admin
 */
export const requireAdmin = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    if (!req.user?.is_admin) {
        res.status(403).json({ok: false, error: "Accès refusé: admin uniquement"});
        return;
    }
    next();
};

/**
 * Vérifie que l'utilisateur a un rôle spécifique
 * Utilisation: app.get("/route", requireRole("teacher"), handler)
 */
export const requireRole = (...roles: User["user_type"][]) => {
    return (req: Request, res: Response, next: NextFunction): void => {
        if (!req.user?.user_type || !roles.includes(req.user.user_type)) {
            res.status(403).json({
                ok: false,
                error: `Accès refusé: rôles autorisés - ${roles.join(", ")}`,
            });
            return;
        }
        next();
    };
};

/**
 * Vérifie que l'utilisateur est admin OU a un rôle spécifique
 */
export const requireAdminOrRole = (...roles: User["user_type"][]) => {
    return (req: Request, res: Response, next: NextFunction): void => {
        if (req.user?.is_admin) {
            next();
            return;
        }

        if (!req.user?.user_type || !roles.includes(req.user.user_type)) {
            res.status(403).json({
                ok: false,
                error: `Accès refusé: admin ou rôles ${roles.join(", ")} requis`,
            });
            return;
        }
        next();
    };
};


