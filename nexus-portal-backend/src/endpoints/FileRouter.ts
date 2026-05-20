import express from "express";
import { CreateFileStoreModelZod } from "../interfaces/FileStoreModel.js";
import ResponseService from "../services/ResponseService.js";
import { BadRequest } from "../utils/HttpErrors.js";
import FileStorageService from "../services/FileStorageService.js";
import UserService from "../services/UserService.js";
import FileService from "../services/FileService.js";
import { join } from "path";
import { UserNotFound } from "../exceptions/UserExceptions.js";

const FileRouter = express.Router();
const { makeSuccessResponse, makeFailureResponse } = ResponseService;

FileRouter.post("/storefile", async (req, res) => {
    const file_store_payload = CreateFileStoreModelZod.safeParse(req["body"]);

    if (file_store_payload.error) {
        res.status(401).send(makeFailureResponse(BadRequest(file_store_payload.error)));
    } else {
        const sf_response = await FileStorageService.StoreFile(
            file_store_payload.data.email,
            file_store_payload.data.filename,
            file_store_payload.data.file_contents,
        );
        res.status(200).send(makeSuccessResponse(sf_response));
    }
});

FileRouter.get("/retrievefile/:email/:filename", async (req, resp) => {
    const email = req.params.email;
    const filename = req.params.filename;

    const rf_response = await FileStorageService.RetrieveFile(email, filename);

    if (email && filename) {
        resp.status(200).send(makeSuccessResponse(rf_response));
    } else {
        resp.status(401).send(
            makeFailureResponse(BadRequest("one or more parameters are missing")),
        );
    }
});

FileRouter.get("/profilepicture/:email", async (req, resp) => {
    const email_param = req.params.email;
    if (email_param) {
        const usr = await UserService.getOneByEmail(email_param);
        if (usr.ok) {
            const pfp = await FileService.readByNameAndUid(usr.data.id, "pfp");
            if (pfp) {
                resp.sendFile(
                    join(
                        FileStorageService.GetDirname(),
                        usr.data.id.toString(),
                        "pfp",
                        pfp.dataValues.extension,
                    ),
                );
            }
        } else {
            return makeFailureResponse(UserNotFound(email_param));
        }
    } else {
        return makeFailureResponse(BadRequest("Email is missing"));
    }
});

export default FileRouter;
