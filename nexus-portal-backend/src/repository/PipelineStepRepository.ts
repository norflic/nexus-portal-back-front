

import { PipelineStepSequelize, PipelineStep, PartialPipelineStep } from "../model/PipelineStep.js";

async function createPipelineStep(PipelineStep: PipelineStep) {
    return PipelineStepSequelize.create(PipelineStep);
}

async function readPipelineStepById(id: number) {
    return PipelineStepSequelize.findByPk(id);
}
async function readAllPipelineSteps() {
    return PipelineStepSequelize.findAll();
}

async function readAllPipelineStepsByState(state: string)  {
    return PipelineStepSequelize.findAll({
        where: {
            state: state
        }
    })
}

async function readAllPipelineStepsByUserId(uid: number) {
    return PipelineStepSequelize.findAll({
        where: {
            user_id: uid
        }
    })
}

async function updatePipelineStepById(usr: PartialPipelineStep) {
    return PipelineStepSequelize.update(usr, {
        where: {
            id: usr.id
        }
    });
}

async function deletePipelineStepById(id: number) {
    return PipelineStepSequelize.destroy({
        where: {
            id: id
        }
    });
}

const PipelineStepRepository = {
    createPipelineStep,
    readPipelineStepById,
    readAllPipelineSteps,
    readAllPipelineStepsByState,
    readAllPipelineStepsByUserId,
    updatePipelineStepById,
    deletePipelineStepById,
}

export default PipelineStepRepository;