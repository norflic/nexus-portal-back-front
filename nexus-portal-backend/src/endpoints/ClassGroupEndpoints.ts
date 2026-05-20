

import { ClassGroupSequelize, ClassGroupZod, CreateClassGroupZod } from "../model/ClassGroup.js";
import ClassGroupService from "../services/ClassGroupService.js";
import { app } from "../index.js";
import ResponseService from "../services/ResponseService.js";
import { BadRequest, NoDataFoundReadAll } from "../utils/HttpErrors.js";
import { Result } from "pg";
import { makeDMLQueryResult } from "../utils/DMLQueryResult.js";
import { NotFoundException } from "../exceptions/AuthExceptions.js";
import { UnwrapModelList } from "../utils/UnwrapModelList.js";

const { makeSuccessResponse, makeFailureResponse } = ResponseService;

export default function DefineClassGroupEndpoints() {
    // CREATE
    app.post("/classgroup", async (req, resp) => {
        const req_data = req.body["data"];
        const ClassGroup_data = CreateClassGroupZod.safeParse(req_data);
        if (ClassGroup_data.success) {
            const result = await ClassGroupService.create(ClassGroup_data.data);
            resp.status(200).send(makeSuccessResponse(result.dataValues));
        } else {
            resp.status(400).send(makeFailureResponse(BadRequest(ClassGroup_data.error)));
        }
    });

    // UPDATE ALL FIELDS
    app.put("/classgroup", async (req, resp) => {
        const req_data = req.body["data"];

        const ClassGroup_data = ClassGroupZod.safeParse(req_data);
        
        if(ClassGroup_data.success) {
            const result = (await ClassGroupService.updateById(ClassGroup_data.data));
            resp.status(200).send(makeSuccessResponse(makeDMLQueryResult(result[0])));
        } else {
            resp.status(500).send(makeFailureResponse(BadRequest(ClassGroup_data.error)));
        }
    });

    app.delete("/classgroup/:id", async (req, resp) => {
        const id_param = req.params.id;
        const result = await ClassGroupService.deleteById(parseInt(id_param));
        resp.status(200).send(makeSuccessResponse(makeDMLQueryResult(result)))
    });

    app.get("/classgroup/:id", async (req, resp) => {
        const id_param = req.params.id;
        const ClassGroup = await ClassGroupService.readById(parseInt(id_param));

        if(ClassGroup) {
            resp.status(200).send(makeSuccessResponse(ClassGroup.dataValues));
        } else {
            resp.status(404).send(makeFailureResponse(NotFoundException("classgroup", "id", id_param)));
        }
    });

    app.get("/classgroups", async (req, resp) => {
        const ClassGroups = await ClassGroupService.readAll();

        if(ClassGroups) {
            resp.status(200).send(makeSuccessResponse(UnwrapModelList(ClassGroups)));
        } else {
            resp.status(404).send(makeSuccessResponse(NoDataFoundReadAll("classgroups")));
        }
    });
}