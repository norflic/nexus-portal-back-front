import PipelineStepRepository from "../repository/PipelineStepRepository.js"

const readAllPipelineSteps = async () => {
    return PipelineStepRepository.readAllPipelineSteps();
}

const readPipelineStepByUserId = async (id: number) => {
    return PipelineStepRepository.readAllPipelineStepsByUserId(id);
}

const PipelineStepService = {
    readAllPipelineSteps,
    readPipelineStepByUserId
}

export default PipelineStepService;