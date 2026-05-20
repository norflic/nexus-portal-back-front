import { FileSequelize, File, CreateFile, PartialFile } from "../model/File.js";
import { cleanObject } from "../utils/cleanObject.js";

async function createFile(file: CreateFile) {
    return FileSequelize.create(file);
}

async function readFileById(id: number) {
    return FileSequelize.findByPk(id);
}

async function readFileByName(name: string) {
    return FileSequelize.findOne({
        where: {
            name: name,
        },
    });
}

async function readAllFiles() {
    return FileSequelize.findAll();
}

async function updateFileById(f: File) {
    const { id, ...file } = f;
    const cleaned = cleanObject(file);

    return FileSequelize.update(cleaned, {
        where: {
            id: id,
        },
    });
}

async function readByFileByNameAndUid(id: number, name: string) {
    return FileSequelize.findOne({
        where: {
            user_id: id,
            name: name,
        },
    });
}

async function updateFileByName(f: PartialFile) {
    const { id, ...file } = f;
    const cleaned = cleanObject(file);

    return FileSequelize.update(cleaned, {
        where: {
            name: cleaned.name,
        },
    });
}

async function deleteFileById(id: number) {
    return FileSequelize.destroy({
        where: {
            id: id,
        },
    });
}

async function deleteFileByName(name: string) {
    return FileSequelize.destroy({
        where: {
            name: name,
        },
    });
}

const FileRepository = {
    createFile,
    readFileById,
    readFileByName,
    readByFileByNameAndUid,
    readAllFiles,
    updateFileById,
    updateFileByName,
    deleteFileById,
    deleteFileByName,
};

export default FileRepository;

