
import { ApplicationZod, CreateApplicationZod } from "../model/Application.js";
import ApplicationService from "../services/ApplicationService.js";
import { app } from "../index.js";
import ResponseService from "../services/ResponseService.js";
import { makeDMLQueryResult } from "../utils/DMLQueryResult.js";
import { BadRequest, InternalServerError, NoDataFoundReadAll } from "../utils/HttpErrors.js";
import { NotFoundException } from "../exceptions/AuthExceptions.js";
import { UnwrapModelList } from "../utils/UnwrapModelList.js";

const { makeSuccessResponse, makeFailureResponse } = ResponseService;

export default function DefineApplicationEndpoints() {
    // CREATE
    app.post("/application", async (req, resp) => {
        const req_data = req.body["data"];
        const application_data = ApplicationZod.safeParse(req_data);
        if (application_data.success) {
            const result = await ApplicationService.create(application_data.data);
            resp.status(200).send(makeSuccessResponse(result.dataValues));
        } else {
            resp.status(400).send(makeFailureResponse(BadRequest(application_data.error)));
        }
    });

    // UPDATE ALL FIELDS
    app.put("/application", async (req, resp) => {
        const req_data = req.body["data"];

        const application_data = CreateApplicationZod.safeParse(req_data);
        
        if(application_data.success) {
            const affected = (await ApplicationService.updateById(application_data.data));
            resp.status(200).send(makeSuccessResponse(makeDMLQueryResult(affected[0])));
        } else {
            resp.status(500).send(makeFailureResponse(InternalServerError(application_data.error)));
        }
    });

    app.delete("/application/:id", async (req, resp) => {
        const id_param = req.params.id;
        const affected = await ApplicationService.deleteById(parseInt(id_param));
        resp.status(200).send(makeSuccessResponse(makeDMLQueryResult(affected)));
    });

    app.get("/application/:id", async (req, resp) => {
        const id_param = req.params.id;
        const application = await ApplicationService.readById(parseInt(id_param));

        if(application) {
            resp.status(200).send(makeSuccessResponse(application.dataValues));
        } else {
            resp.status(404).send(makeFailureResponse(NotFoundException("Application", "id", id_param)));
        }
    });

    app.get("application/state/:state", async (req, resp) => {
        const state_param = req.params.state;

        const applications = await ApplicationService.readAllApplicationsByState(state_param);

        if(applications) {
            resp.status(200).send(makeSuccessResponse(UnwrapModelList(applications)));
        } else {
            resp.status(404).send(makeFailureResponse(NotFoundException("Application", "state", state_param)));
        }
    })

    app.get("/applications", async (req, resp) => {
        const applications = await ApplicationService.readAll();

        if(applications) {
            resp.status(200).send(makeSuccessResponse(UnwrapModelList(applications)));
        } else {
            resp.status(404).send(makeFailureResponse(NoDataFoundReadAll("applications")));
        }
    });
}