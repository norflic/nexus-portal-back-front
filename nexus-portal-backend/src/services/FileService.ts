import { CreateFile, File, PartialFile } from "../model/File.js"
import FileRepository from "../repository/FileRepository.js"


const create = (file: CreateFile) => {
    return FileRepository.createFile(file);
}

const readAll = () => {
    return FileRepository.readAllFiles();
}

const readById = (id: number) => {
    return FileRepository.readFileById(id);
}

const readByName = (name: string) => {
    return FileRepository.readFileByName(name);
}

const readByNameAndUid = (id: number, name: string) => {
    return FileRepository.readByFileByNameAndUid(id, name);
}

const updateById = (file: File) => {
    return FileRepository.updateFileById(file);
}

const updateByName = (file: PartialFile) => {
    return FileRepository.updateFileByName(file);
}

const deleteById = (id: number) => {
    return FileRepository.deleteFileById(id);
}

const deleteByName = (name: string) => {
    return FileRepository.deleteFileByName(name);
}

const FileService = {
    create,
    readAll,
    readById,
    readByNameAndUid,
    readByName,
    updateById,
    updateByName,
    deleteById,
    deleteByName
}

export default FileService;