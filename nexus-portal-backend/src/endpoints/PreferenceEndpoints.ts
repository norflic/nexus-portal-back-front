import { PreferenceSequelize, PreferenceZod } from "../model/Preference.js";
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

export default function DefinePreferenceEndpoints() {
    // CREATE
    app.post("/preference", async (req, resp) => {
        const req_data = req.body["data"];
        const preference_data = PreferenceZod.safeParse(req_data);
        if (preference_data.success) {
            const result = await PreferenceSequelize.create(preference_data.data);
            resp.status(200).send(makeSuccessResponse(result.dataValues));
        } else {
            resp.status(400).send(
                makeFailureResponse(BadRequest("preference")),
            );
        }
    });

    // UPDATE ALL FIELDS
    app.put("/preference", async (req, resp) => {
        const req_data = req.body["data"];
        const preference_data = PreferenceZod.safeParse(req_data);
        if (preference_data.success) {
            const result = await PreferenceSequelize.update(preference_data.data, {
                where: {
                    id: preference_data.data.id,
                },
            });
            resp.status(200).send(
                makeSuccessResponse(makeDMLQueryResult(result[0])),
            );
        } else {
            resp.status(500).send(
                makeFailureResponse(InternalServerError(preference_data.error)),
            );
        }
    });

    app.delete("/preference/:id", async (req, resp) => {
        const id_param = req.params.id;
        const result = await PreferenceSequelize.destroy({
            where: {
                id: id_param,
            },
        });
        resp.status(200).send(makeSuccessResponse(makeDMLQueryResult(result)));
    });

    app.get("/preference/:id", async (req, resp) => {
        const id_param = req.params.id;
        const preference = await PreferenceSequelize.findOne({
            where: {
                id: id_param,
            },
        });
        if (preference) {
            resp.status(200).send(makeSuccessResponse(preference.dataValues));
        } else {
            resp.status(404).send(
                makeFailureResponse(
                    NotFoundException("Preference", "id", id_param),
                ),
            );
        }
    });

    app.get("/preferences", async (req, resp) => {
        const preferences = await PreferenceSequelize.findAll();

        if (preferences) {
            resp.status(200).send(
                makeSuccessResponse(UnwrapModelList(preferences)),
            );
        } else {
            resp.status(404).send(
                makeFailureResponse(NoDataFoundReadAll("preferences")),
            );
        }
    });
}
