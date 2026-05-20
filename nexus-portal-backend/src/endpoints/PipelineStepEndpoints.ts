import {
    PipelineStepSequelize,
    PipelineStepZod,
} from "../model/PipelineStep.js";
import PipelineStepService from "../services/PipelineStepService.js";
import { app } from "../index.js";
import ResponseService from "../services/ResponseService.js";
import {
    BadRequest,
    InternalServerError,
    NoDataFoundReadAll,
} from "../utils/HttpErrors.js";
import { makeDMLQueryResult } from "../utils/DMLQueryResult.js";
import { NotFoundException } from "../exceptions/AuthExceptions.js";
import { UnwrapModelList } from "../utils/UnwrapModelList.js";

const { makeSuccessResponse, makeFailureResponse } = ResponseService;

export default function DefinePipelineStepEndpoints() {
    // CREATE
    app.post("/pipelinestep", async (req, resp) => {
        const req_data = req.body["data"];
        const pipeline_step_data = PipelineStepZod.safeParse(req_data);
        if (pipeline_step_data.success) {
            const result =
                await PipelineStepSequelize.create(pipeline_step_data.data);
            resp.status(200).send(makeSuccessResponse(result));
        } else {
            resp.status(400).send(
                makeFailureResponse(BadRequest(pipeline_step_data.error)),
            );
        }
    });

    // UPDATE ALL FIELDS
    app.put("/pipelinestep", async (req, resp) => {
        const req_data = req.body["data"];
        const pipeline_step_data = PipelineStepZod.safeParse(req_data);

        if (pipeline_step_data.success) {
            const result = await PipelineStepSequelize.update(
                pipeline_step_data.data,
                {
                    where: {
                        id: pipeline_step_data.data.id,
                    },
                },
            );
            resp.status(200).send(makeSuccessResponse(result));
        } else {
            resp.status(500).send(
                makeSuccessResponse(
                    InternalServerError(pipeline_step_data.error),
                ),
            );
        }
    });

    app.delete("/pipelinestep/:id", async (req, resp) => {
        const id_param = req.params.id;
        const result = await PipelineStepSequelize.destroy({
            where: {
                id: id_param,
            },
        });
        resp.status(200).send(makeSuccessResponse(makeDMLQueryResult(result)));
    });

    app.get("/pipelinestep/:id", async (req, resp) => {
        const id_param = req.params.id;
        const pipeline_step = await PipelineStepSequelize.findOne({
            where: {
                id: id_param,
            },
        });

        if (pipeline_step) {
            resp.status(200).send(
                makeSuccessResponse(pipeline_step.dataValues),
            );
        } else {
            resp.status(404).send(
                makeFailureResponse(
                    NotFoundException("pipeline_step", "id", id_param),
                ),
            );
        }
    });

    app.get("/pipelinestep/uid/:id", async (req, resp) => {
        const id_param = req.params.id;
        const pipeline_steps =
            await PipelineStepService.readPipelineStepByUserId(
                parseInt(id_param),
            );
        if (pipeline_steps) {
            resp.status(200).send(
                makeSuccessResponse(UnwrapModelList(pipeline_steps)),
            );
        } else {
            resp.status(404).send(
                makeFailureResponse(NoDataFoundReadAll("pipeline_steps")),
            );
        }
    });

    app.get("/pipelinesteps", async (req, resp) => {
        const pipeline_steps = await PipelineStepService.readAllPipelineSteps();

        if (pipeline_steps) {
            resp.status(200).send(
                makeSuccessResponse(UnwrapModelList(pipeline_steps)),
            );
        } else {
            resp.status(404).send(
                makeFailureResponse(NoDataFoundReadAll("pipeline_steps")),
            );
        }
    });
}