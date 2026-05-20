
import { FileSequelize, FileZod } from "../model/File.js";
import { app } from "../index.js";
import ResponseService from "../services/ResponseService.js";
import { NotFoundException } from "../exceptions/AuthExceptions.js";
import { BadRequest, InternalServerError, NoDataFoundReadAll } from "../utils/HttpErrors.js";
import { DMLQueryResultZod, makeDMLQueryResult } from "../utils/DMLQueryResult.js";
import { UnwrapModelList } from "../utils/UnwrapModelList.js";

const { makeSuccessResponse, makeFailureResponse } = ResponseService;

export default function DefineFileEndpoints() {
    // CREATE
app.post("/file", async (req, resp) => {
    const req_data = req.body["data"];
    const file_data = FileZod.safeParse(req_data);
    if (file_data.success) {
        const result = await FileSequelize.create(file_data.data);
        resp.status(200).send(makeSuccessResponse(result.dataValues));
    } else {
        resp.status(400).send(makeFailureResponse(BadRequest(file_data.error)));
    }
});

// UPDATE ALL FIELDS
app.put("/file", async (req, resp) => {
    const req_data = req.body["data"];
    const file_data = FileZod.safeParse(req_data);
    
    if(file_data.success) {
        const result = await FileSequelize.update(file_data.data, {
            where: {
                id: file_data.data.id
            }
        });
        resp.status(200).send(makeSuccessResponse(makeDMLQueryResult(result[0])));
    } else {
        resp.status(500).send(makeFailureResponse(InternalServerError(file_data.error)));
    }
});

app.delete("/file/:id", async (req, resp) => {
    const id_param = req.params.id;
    const result = await FileSequelize.destroy({
        where: {
            id: id_param
        }
    });
    resp.status(200).send(makeSuccessResponse(makeDMLQueryResult(result)));
});

app.get("/file/:id", async (req, resp) => {
    const id_param = req.params.id;
    const file = await FileSequelize.findOne({
        where: {
            id: id_param
        }
    });

    if(file) {
        resp.status(200).send(makeSuccessResponse(file.dataValues));
    } else {
        resp.status(404).send(makeFailureResponse(NotFoundException("File", "id", id_param)));
    }
});

app.get("/files", async (req, resp) => {
    const files = await FileSequelize.findAll();

    if(files) {
        resp.status(200).send(makeSuccessResponse(UnwrapModelList(files)));
    } else {
        resp.status(404).send(makeFailureResponse(NoDataFoundReadAll("files")));
    }
});
}