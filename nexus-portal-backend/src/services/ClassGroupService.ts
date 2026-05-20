import { ClassGroup, CreateClassGroup, PartialClassGroup } from "../model/ClassGroup.js"
import ClassGroupRepository from "../repository/ClassGroupRepository.js"


const create = (class_group: CreateClassGroup) => {
    return ClassGroupRepository.createClassGroup(class_group);
}

const readAll = () => {
    return ClassGroupRepository.readAllClassGroups();
}

const readById = (id: number) => {
    return ClassGroupRepository.readClassGroupById(id);
}

const readByName = (name: string) => {
    return ClassGroupRepository.readClassGroupByName(name);
}

const updateById = (class_group: PartialClassGroup) => {
    return ClassGroupRepository.updateClassGroupById(class_group);
}

const updateByName = (class_group: PartialClassGroup) => {
    return ClassGroupRepository.updateClassGroupByName(class_group);
}

const deleteById = (id: number) => {
    return ClassGroupRepository.deleteClassGroupById(id);
}

const deleteByName = (name: string) => {
    return ClassGroupRepository.deleteClassGroupByName(name);
}

const ClassGroupService = {
    create,
    readAll,
    readById,
    readByName,
    updateById,
    updateByName,
    deleteById,
    deleteByName
}

export default ClassGroupService;