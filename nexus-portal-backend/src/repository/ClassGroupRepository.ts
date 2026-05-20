import {
    ClassGroupSequelize,
    ClassGroup,
    CreateClassGroup,
    PartialClassGroup,
} from "../model/ClassGroup.js";
import { cleanObject } from "../utils/cleanObject.js";

async function createClassGroup(class_group: CreateClassGroup) {
    return ClassGroupSequelize.create(class_group);
}

async function readClassGroupById(id: number) {
    return ClassGroupSequelize.findByPk(id);
}

async function readClassGroupByName(name: string) {
    return ClassGroupSequelize.findOne({
        where: {
            name: name,
        },
    });
}

async function readAllClassGroups() {
    return ClassGroupSequelize.findAll();
}

async function updateClassGroupById(cg: PartialClassGroup) {
    const { id, ...class_group } = cg;
    const cleaned = cleanObject(class_group);

    return ClassGroupSequelize.update(cleaned, {
        where: {
            id: id,
        },
    });
}

async function updateClassGroupByName(cg: PartialClassGroup) {
    const { id, ...class_group } = cg;
    const cleaned = cleanObject(class_group);

    return ClassGroupSequelize.update(cleaned, {
        where: {
            name: cleaned.name,
        },
    });
}

async function deleteClassGroupById(id: number) {
    return ClassGroupSequelize.destroy({
        where: {
            id: id,
        },
    });
}

async function deleteClassGroupByName(name: string) {
    return ClassGroupSequelize.destroy({
        where: {
            name: name,
        },
    });
}

const ClassGroupRepository = {
    createClassGroup,
    readClassGroupById,
    readClassGroupByName,
    readAllClassGroups,
    updateClassGroupById,
    updateClassGroupByName,
    deleteClassGroupById,
    deleteClassGroupByName,
};

export default ClassGroupRepository;

