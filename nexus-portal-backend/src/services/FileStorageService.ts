import FS from "fs/promises";
import { join } from "path";
import UserService from "./UserService.js";
import { FALLBACK_WORKING_DIRECTORY_PATH } from "../index.js";
import ResponseService from "./ResponseService.js";
import FileService from "./FileService.js";
import { BadRequest } from "../utils/HttpErrors.js";

const GetDirname = () => {
    if (process.env.WORKING_DIRECTORY_PATH === undefined) {
        return FALLBACK_WORKING_DIRECTORY_PATH;
    } else {
        return process.env.WORKING_DIRECTORY_PATH;
    }
};

const InitFileDirectory = async (wd_name: string) => {
    FS.mkdir(join(process.cwd(), wd_name), { recursive: true });
};

const StoreFile = async (email: string, filename: string, file: string) => {
    const usr = await UserService.getOneByEmail(email);
    var usr_id = -1;

    if (usr.ok) {
        usr_id = usr.data.id;
        try {
            await FS.mkdir(join(GetDirname(), usr_id.toString()), {
                recursive: true,
            });
            await FS.writeFile(
                join(GetDirname(), usr_id.toString(), filename),
                file,
            );
            const extension = filename.split(".")[1];
            if (extension) {
                await FileService.create({
                    name: filename,
                    user_id: usr_id,
                    path: join(GetDirname(), usr_id.toString(), filename),
                    extension: extension,
                });
            } else {
                return ResponseService.makeFailureResponse(BadRequest("the file has no extension."))
            }
            return ResponseService.makeSuccessResponse("File successfully stored.");
        } catch (error) {
            return ResponseService.makeFailureResponse(error as Error);
        }
    } else {
        return ResponseService.makeFailureResponse(usr.error);
    }
};

const RetrieveFile = async (email: string, filename: string) => {
    console.log("retrieve file : func");

    const usr = await UserService.getOneByEmail(email);
    var usr_id = -1;

    if (usr.ok) {
        usr_id = usr.data.id;
        try {
            const file = await FS.readFile(join(GetDirname(), usr_id.toString(), filename));
            return ResponseService.makeSuccessResponse(file);
        } catch (error) {
            return ResponseService.makeFailureResponse(error as Error);
        }
    } else {
        return ResponseService.makeFailureResponse(usr.error);
    }
};

const BuildFilePath = async (uid: number, filename: string) => {
    return `/files/${uid}/${filename}`;
};

const FileStorageService = {
    GetDirname,
    InitFileDirectory,
    StoreFile,
    RetrieveFile,
    BuildFilePath,
};

export default FileStorageService;
