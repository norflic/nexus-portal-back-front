
import { Application, CreateApplication, PartialApplication, } from "../model/Application.js"
import ApplicationRepository from "../repository/ApplicationRepository.js"

const create = (application: CreateApplication) => {
    return ApplicationRepository.createApplication(application)
}

const readAll = () => {
    return ApplicationRepository.readAllApplications();
}

const readAllApplicationsByState = (state: string) => {
    return ApplicationRepository.readAllApplicationsByState(state);
}

const readAllApplicationsByUserId = (uid: number) => {
    return ApplicationRepository.readAllApplicationsByUserId(uid);
}

const readById = (id: number) => {
    return ApplicationRepository.readApplicationById(id);
}

const readByUserId = (uid: number) => {
    return ApplicationRepository.readAllApplicationsByUserId(uid);
}

const updateById = (application: PartialApplication) => {
    return ApplicationRepository.updateApplicationById(application);
}

const deleteById = (id: number) => {
    return ApplicationRepository.deleteApplicationById(id);
}

const ApplicationService = {
    create,
    readAll,
    readById,
    readByUserId,
    readAllApplicationsByState,
    readAllApplicationsByUserId,
    updateById,
    deleteById
}

export default ApplicationService;