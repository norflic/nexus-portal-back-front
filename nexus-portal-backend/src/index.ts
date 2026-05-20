import express from "express";
import dotenv from "dotenv";

import DefineAllEndpoints from './endpoints/DefineAllEndpoints.js';
import {DefineAllAssociations} from './database/DefineAllAssociations.js';
import {SyncAllModels} from './database/Database.js';
import {getXLSXsheets} from './services/ExcelService.js';
import FileStorageService from './services/FileStorageService.js';
import cors from "cors";
import GeneralRouter from "./endpoints/GeneralRouter.js";
import AuthRouter from "./endpoints/AuthRouter.js";
import FileRouter from "./endpoints/FileRouter.js";
import UserRouter from "./endpoints/UserRouter.js";
import SeedAll from "./utils/seed/SeedAll.js";
import dataset from "./utils/seed/Dataset.js";
import {extractUserFromHeaders} from "./middleware/RoleMiddleware.js";

dotenv.config();

export const app = express();

const allowedOrigins = ["http://localhost:5173"];
const IS_SEED_ACTIVATED = process.env.SEED || null;

const options: cors.CorsOptions = {
    exposedHeaders: [
        "X-User-Id",
        "X-User-Email",
        "X-User-Type",
        "X-User-Is-Admin",
    ],
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Origine non autorisée par la politique CORS"));
        }
    },
};

app.use(express.json());
app.use(cors(options));
app.use(extractUserFromHeaders);

export const FALLBACK_WORKING_DIRECTORY_PATH = "files";
export const FALLBACK_SERVER_PORT = 3000;

if (process.env.WORKING_DIRECTORY_PATH) {
    FileStorageService.InitFileDirectory(process.env.WORKING_DIRECTORY_PATH);
} else {
    FileStorageService.InitFileDirectory(FALLBACK_WORKING_DIRECTORY_PATH);
}

(async () => {
    DefineAllAssociations();
    await SyncAllModels(true);
    DefineAllEndpoints();
    if (IS_SEED_ACTIVATED) { SeedAll(dataset); }
})();

getXLSXsheets("sheets/disponibilites_salles.xlsx");

app.use(GeneralRouter);
app.use(AuthRouter);
app.use(FileRouter);
app.use(UserRouter);


const USED_PORT = (process.env.SERVER_PORT) ? parseInt(process.env.SERVER_PORT) : FALLBACK_SERVER_PORT;
app.listen(USED_PORT, () => console.log(`----- Server started on port ${USED_PORT} -----`));
