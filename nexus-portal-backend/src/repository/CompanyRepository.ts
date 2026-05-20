import { Company, CompanySequelize, CreateCompany, PartialCompany } from "../model/Company.js";
import { Op } from "sequelize";
import { cleanObject } from "../utils/cleanObject.js";

async function createCompany(usr: CreateCompany) {
    return CompanySequelize.create(usr);
}

async function readCompanyById(id: number) {
    return CompanySequelize.findByPk(id);
}

async function readCompanyByName(name: string) {
    return CompanySequelize.findOne({
        where: {
            name: name,
        },
    });
}

async function searchCompaniesByName(name: string) {
    return CompanySequelize.findAll({
        where: {
            name: {
                [Op.substring]: `${name}`,
            },
        },
    });
}

async function readAllCompanies() {
    return CompanySequelize.findAll();
}

async function readAllCompaniesByPostalCode(postal_code: string) {
    return CompanySequelize.findAll({
        where: {
            postal_code: postal_code,
        },
    });
}

async function readAllCompaniesByCityName(city_name: string) {
    return CompanySequelize.findAll({
        where: {
            city_name: city_name,
        },
    });
}

async function updateCompanyById(company: PartialCompany) {
    const { id, ...companyData } = company;
    const cleaned = cleanObject(companyData);

    return CompanySequelize.update(cleaned, {
        where: {
            id: company.id,
        },
    });
}

async function updateCompanyByName(company: PartialCompany) {
    const { id, ...companyData } = company;
    const cleaned = cleanObject(companyData);

    return CompanySequelize.update(cleaned, {
        where: {
            name: company.name,
        },
    });
}

async function deleteCompanyById(id: number) {
    return CompanySequelize.destroy({
        where: {
            id: id,
        },
    });
}

async function deleteCompanyByName(name: string) {
    return CompanySequelize.destroy({
        where: {
            name: name,
        },
    });
}

const CompanyRepository = {
    createCompany,
    readCompanyById,
    readCompanyByName,
    searchCompaniesByName,
    readAllCompanies,
    readAllCompaniesByCityName,
    readAllCompaniesByPostalCode,
    updateCompanyById,
    updateCompanyByName,
    deleteCompanyById,
    deleteCompanyByName,
};

export default CompanyRepository;

