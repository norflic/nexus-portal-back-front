
import { ApplicationSequelize, Application, CreateApplication, PartialApplication } from "../model/Application.js";

async function createApplication(application: CreateApplication) {
    return ApplicationSequelize.create(application);
}

async function readApplicationById(id: number) {
    return ApplicationSequelize.findByPk(id);
}

async function readAllApplications() {
    return ApplicationSequelize.findAll();
}

async function readAllApplicationsByState(state: string)  {
    return ApplicationSequelize.findAll({
        where: {
            state: state
        }
    })
}

async function readAllApplicationsByUserId(uid: number) {
    return ApplicationSequelize.findAll({
        where: {
            user_id: uid
        }
    })
}

async function updateApplicationById(usr: PartialApplication) {
    return ApplicationSequelize.update(usr, {
        where: {
            id: usr.id
        }
    });
}

async function deleteApplicationById(id: number) {
    return ApplicationSequelize.destroy({
        where: {
            id: id
        }
    });
}

const ApplicationRepository = {
    createApplication,
    readApplicationById,
    readAllApplications,
    readAllApplicationsByState,
    readAllApplicationsByUserId,
    updateApplicationById,
    deleteApplicationById,
}

export default ApplicationRepository;