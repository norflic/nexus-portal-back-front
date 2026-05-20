import {Company, CreateCompany, PartialCompany} from "../model/Company.js"
import CompanyRepository from "../repository/CompanyRepository.js"

const create = (company: CreateCompany) => {
    return CompanyRepository.createCompany(company);
}

const readById = (id: number) => {
    return CompanyRepository.readCompanyById(id);
}

const readByName = (name: string) => {
    return CompanyRepository.readCompanyByName(name);
}

const searchByName = (name: string) => {
    return CompanyRepository.searchCompaniesByName(name);
}

const readAll = () => {
    return CompanyRepository.readAllCompanies();
}

const readByPostalCode = (postal_code: string) => {
    return CompanyRepository.readAllCompaniesByPostalCode(postal_code);
}

const updateById = (company: PartialCompany) => {
    return CompanyRepository.updateCompanyById(company);
}

const updateByName = (company: PartialCompany) => {
    return CompanyRepository.updateCompanyByName(company);
}

const deleteById = (id: number) => {
    return CompanyRepository.deleteCompanyById(id);
}

const deleteByName = (name: string) => {
    return CompanyRepository.deleteCompanyByName(name);
}

const CompanyService = {
    create,
    readAll,
    readById,
    readByName,
    searchByName,
    readByPostalCode,
    updateById,
    updateByName,
    deleteById,
    deleteByName
}

export default CompanyService;