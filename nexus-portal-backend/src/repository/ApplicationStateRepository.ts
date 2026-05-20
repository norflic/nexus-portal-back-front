import {
    ApplicationStateSequelize,
    ApplicationState,
    PartialApplicationState,
} from "../model/ApplicationState.js";
import { cleanObject } from "../utils/cleanObject.js";

async function createApplicationState(usr: ApplicationState) {
    return ApplicationStateSequelize.create(usr);
}

async function readApplicationStateById(id: number) {
    return ApplicationStateSequelize.findByPk(id);
}

async function readAllApplicationStates() {
    return ApplicationStateSequelize.findAll();
}

async function updateApplicationStateById(app: PartialApplicationState) {
    const { id, ...application } = app;
    const cleaned = cleanObject(application);

    return ApplicationStateSequelize.update(cleaned, {
        where: {
            id: id,
        },
    });
}

async function updateApplicationStateByName(app: PartialApplicationState) {
    const { id, ...application } = app;
    const cleaned = cleanObject(application);

    return ApplicationStateSequelize.update(cleaned, {
        where: {
            name: cleaned.name,
        },
    });
}

async function deleteApplicationStateById(id: number) {
    return ApplicationStateSequelize.destroy({
        where: {
            id: id,
        },
    });
}

async function deleteApplicationStateByName(name: string) {
    return ApplicationStateSequelize.destroy({
        where: {
            name: name,
        },
    });
}

const ApplicationStateRepository = {
    createApplicationState,
    readApplicationStateById,
    readAllApplicationStates,
    updateApplicationStateById,
    updateApplicationStateByName,
    deleteApplicationStateById,
    deleteApplicationStateByName,
};

export default ApplicationStateRepository;

