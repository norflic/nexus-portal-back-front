import express from "express"
import ResponseService from "../services/ResponseService.js";
import ConnectionInstance from "../database/Connection.js";
import {requireAdmin} from "../middleware/RoleMiddleware.js";

const GeneralRouter = express.Router();
const { makeSuccessResponse, makeFailureResponse } = ResponseService;
const connection = ConnectionInstance.getInstance();

GeneralRouter.get("/", (_req, res, next) => {
    res.status(200).send(
        makeSuccessResponse("Nexus Portal Company Server is On."),
    );
    next();
});

GeneralRouter.get("/connection-test", async (_req, res, next) => {
    res.status(200).send(
        makeSuccessResponse({ dbVersion: `${await connection.databaseVersion()}` }),
    );
    next();
});

GeneralRouter.get("/admin", requireAdmin, (_req, res, next) => {
    res.status(200).send(
        makeSuccessResponse({message: "Bienvenue dans la zone admin!"}),
    );
    next();
});

// Route pour récupérer les infos de l'utilisateur connecté
GeneralRouter.get("/me", (_req, res, next) => {
    if (!_req.user?.email) {
        res.status(401).send(makeFailureResponse("Non authentifié"));
        return next();
    }
    res.status(200).send(
        makeSuccessResponse(_req.user),
    );
    next();
});

export default GeneralRouter;
