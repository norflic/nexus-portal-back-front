import {CreateDefense, DefenseCascade, DefenseSequelize, PartialDefense} from "../model/Defense.js";
import {cleanObject} from "../utils/cleanObject.js";
import CompanyRepository from "./CompanyRepository.js";
import UserRepository from "./UserRepository.js";
import {Op} from "sequelize";

/**
 * Fetches defenses for a given year and month
 * @author Nils
 * @param year
 * @param month
 */
async function readDefenseByDate(year: number, month: number) {
    const start = new Date(Date.UTC(year, month - 1, 1, 0, 0, 0));
    const end = new Date(Date.UTC(year, month, 1, 0, 0, 0));
    return DefenseSequelize.findAll({
        where: {
            date: {
                [Op.gte]: start,
                [Op.lt]: end,
            },
        },
    });
}

async function createDefense(Defense: CreateDefense) {
    return DefenseSequelize.create(Defense);
}

async function readDefenseById(id: number) {
    return DefenseSequelize.findByPk(id);
}

async function readDefenseCascade(id: number): Promise<DefenseCascade | null> {
    const def = await readDefenseById(id);
    if (def) {
        const company = await CompanyRepository.readCompanyById(def.dataValues.company_id);
        const company_member = await UserRepository.getUserById(def.dataValues.company_member_id);
        const candid = await UserRepository.getUserById(def.dataValues.candid_teacher_id);
        const tech_teacher = await UserRepository.getUserById(def.dataValues.tech_teacher_id);
        const student = await UserRepository.getUserById(def.dataValues.student_id);

        return {
            id: def.dataValues.id,
            room: def.dataValues.room,
            date: def.dataValues.date,
            company: company?.dataValues ?? null,
            hour_start: def.dataValues.hour_start,
            hour_end: def.dataValues.hour_end,
            candid_teacher: candid?.dataValues ?? null,
            tech_teacher: tech_teacher?.dataValues ?? null,
            company_member: company_member?.dataValues ?? null,
            student: student?.dataValues ?? null
        }
    } else {
        return null;
    }
}

async function readDefenseCascadesByDate(year: number, month: number): Promise<DefenseCascade[]> {
    const incompleteDefenses = await readDefenseByDate(year, month);
    const defenseCascades: DefenseCascade[] = [];
    for (let incompleteDefense of incompleteDefenses) {
        const [company, company_member, candid, tech_teacher, student] = await Promise.all([
            CompanyRepository.readCompanyById(incompleteDefense.dataValues.company_id),
            UserRepository.getUserById(incompleteDefense.dataValues.company_member_id),
            UserRepository.getUserById(incompleteDefense.dataValues.candid_teacher_id),
            UserRepository.getUserById(incompleteDefense.dataValues.tech_teacher_id),
            UserRepository.getUserById(incompleteDefense.dataValues.student_id),
        ]);
        defenseCascades.push({
            id: incompleteDefense.dataValues.id,
            room: incompleteDefense.dataValues.room,
            date: incompleteDefense.dataValues.date,
            company: company?.dataValues ?? null,
            hour_start: incompleteDefense.dataValues.hour_start,
            hour_end: incompleteDefense.dataValues.hour_end,
            candid_teacher: candid?.dataValues ?? null,
            tech_teacher: tech_teacher?.dataValues ?? null,
            company_member: company_member?.dataValues ?? null,
            student: student?.dataValues ?? null
        })
    }
    return defenseCascades
}

async function readDefenseByCompanyId(id: number) {
    return DefenseSequelize.findAll({
        where: {
            company_id: id,
        },
    });
}

async function readDefenseByStudentId(id: number) {
    return DefenseSequelize.findAll({
        where: {
            student_id: id,
        },
    });
}

async function readDefenseByCompanyMemberId(id: number) {
    return DefenseSequelize.findAll({
        where: {
            company_member_id: id,
        },
    });
}

async function readDefenseByCandidTeacherId(id: number) {
    return DefenseSequelize.findAll({
        where: {
            candid_teacher_id: id,
        },
    });
}

async function readDefenseByTechTeacherId(id: number) {
    return DefenseSequelize.findAll({
        where: {
            tech_teacher_id: id,
        },
    });
}

async function readAllDefenses() {
    return DefenseSequelize.findAll();
}

async function readAllDefensesByStudentId(uid: number) {
    return DefenseSequelize.findAll({
        where: {
            student_id: uid,
        },
    });
}

async function updateDefenseById(def: PartialDefense) {
    const { id, ...cleaned_defense } = def;
    const cleaned = cleanObject(cleaned_defense);

    return DefenseSequelize.update(cleaned, {
        where: {
            id: id,
        },
    });
}

async function updateDefenseByStudentId(sid: number, def: PartialDefense) {
    const { id, ...cleaned_defense } = def;
    const cleaned = cleanObject(cleaned_defense);

    return DefenseSequelize.update(cleaned, {
        where: {
            student_id: sid,
        },
    });
}

async function deleteDefenseById(id: number) {
    return DefenseSequelize.destroy({
        where: {
            id: id,
        },
    });
}

const DefenseRepository = {
    createDefense,
    readDefenseById,
    readDefenseByDate,
    readDefenseCascade,
    readDefenseCascadesByDate,
    readAllDefenses,
    readAllDefensesByStudentId,
    readDefenseByCompanyId,
    readDefenseByStudentId,
    readDefenseByCompanyMemberId,
    readDefenseByCandidTeacherId,
    readDefenseByTechTeacherId,
    updateDefenseByStudentId,
    updateDefenseById,
    deleteDefenseById,
};

export default DefenseRepository;
