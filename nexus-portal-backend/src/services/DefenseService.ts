import {CreateDefense, PartialDefense} from "../model/Defense.js";
import DefenseRepository from "../repository/DefenseRepository.js";

const create = (defense: CreateDefense) => {
    return DefenseRepository.createDefense(defense);
};

const readAll = () => {
    return DefenseRepository.readAllDefenses();
};

const readById = (id: number) => {
    return DefenseRepository.readDefenseById(id);
};

/**
 * @author Nils
 * @param year
 * @param month
 */
const readByDate = (year: number, month: number) => {
    return DefenseRepository.readDefenseByDate(year, month);
};

const readCascadesByDate = (year: number, month: number) => {
    return DefenseRepository.readDefenseCascadesByDate(year, month);
};

const readCascadeById = (id: number) => {
    return DefenseRepository.readDefenseCascade(id);
}

const readCandidTeacherId = (id: number) => {
    return DefenseRepository.readDefenseByCandidTeacherId(id);
};

const readByStudentId = (id: number) => {
    return DefenseRepository.readDefenseByStudentId(id);
};

const readByCompanyId = (id: number) => {
    return DefenseRepository.readDefenseByCompanyId(id);
};

const readByTechTeacherId = (id: number) => {
    return DefenseRepository.readDefenseByTechTeacherId(id);
};

const updateById = (defense: PartialDefense) => {
    return DefenseRepository.updateDefenseById(defense);
};

const deleteById = (id: number) => {
    return DefenseRepository.deleteDefenseById(id);
};

const DefenseService = {
    create,
    readAll,
    readById,
    readCascadeById,
    readByDate,
    readCascadesByDate,
    readCandidTeacherId,
    readByCompanyId,
    readByStudentId,
    readByTechTeacherId,
    updateById,
    deleteById,
};

export default DefenseService;
