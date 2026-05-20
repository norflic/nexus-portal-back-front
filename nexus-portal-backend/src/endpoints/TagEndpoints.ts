import { TagSequelize, TagZod } from "../model/Tag.js";
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

export default function DefineTagEndpoints() {
    // CREATE
    app.post("/tag", async (req, resp) => {
        const req_data = req.body["data"];
        const Tag_data = TagZod.safeParse(req_data);
        if (Tag_data.success) {
            const result = await TagSequelize.create(Tag_data.data);
            resp.status(200).send(makeSuccessResponse(result.dataValues));
        } else {
            resp.status(400).send(
                makeFailureResponse(BadRequest(Tag_data.error)),
            );
        }
    });

    // UPDATE ALL FIELDS
    app.put("/tag", async (req, resp) => {
        const req_data = req.body["data"];
        const Tag_data = TagZod.safeParse(req_data);
        if (Tag_data.success) {
            const result = await TagSequelize.update(Tag_data.data, {
                where: {
                    id: Tag_data.data.id,
                },
            });
            resp.status(200).send(
                makeSuccessResponse(makeDMLQueryResult(result[0])),
            );
        } else {
            resp.status(500).send(
                makeFailureResponse(InternalServerError(Tag_data.error)),
            );
        }
    });

    app.delete("/tag/:id", async (req, resp) => {
        const id_param = req.params.id;
        const result = await TagSequelize.destroy({
            where: {
                id: id_param,
            },
        });
        resp.status(200).send(makeSuccessResponse(makeDMLQueryResult(result)));
    });

    app.get("/tag/:id", async (req, resp) => {
        const id_param = req.params.id;
        const Tag = await TagSequelize.findOne({
            where: {
                id: id_param,
            },
        });

        if (Tag) {
            resp.status(200).send(makeSuccessResponse(Tag.dataValues));
        } else {
            resp.status(404).send(
                makeFailureResponse(NotFoundException("tag", "id", id_param)),
            );
        }
    });

    app.get("/tags", async (req, resp) => {
        const Tags = await TagSequelize.findAll();

        if (Tags) {
            resp.status(200).send(makeSuccessResponse(UnwrapModelList(Tags)));
        } else {
            resp.status(404).send(
                makeFailureResponse(NoDataFoundReadAll("tags")),
            );
        }
    });
}
