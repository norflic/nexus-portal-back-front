import {CompanyZod, CreateCompanyZod} from "../model/Company.js";
import {app} from "../index.js";
import CompanyService from "../services/CompanyService.js";
import ResponseService from "../services/ResponseService.js";
import { makeDMLQueryResult } from "../utils/DMLQueryResult.js";
import { BadRequest, InternalServerError, NoDataFoundReadAll } from "../utils/HttpErrors.js";
import { NotFoundException } from "../exceptions/AuthExceptions.js";
import { UnwrapModelList } from "../utils/UnwrapModelList.js";

const { makeSuccessResponse, makeFailureResponse } = ResponseService;

export default function DefineCompanyEndpoints() {
    // CREATE
    app.post("/company", async (req, resp) => {
        const req_data = req.body["data"];
        const company_data = CreateCompanyZod.safeParse(req_data);
        if (company_data.success) {
            const result = await CompanyService.create(company_data.data);
            resp.status(200).send(makeSuccessResponse(result.dataValues));
        } else {
            resp.status(400).send(makeFailureResponse(BadRequest(company_data.error)));
        }
    });

    // UPDATE ALL FIELDS
    app.put("/company", async (req, resp) => {
        const req_data = req.body["data"];
        const company_data = CompanyZod.safeParse(req_data);
        
        if(company_data.success) {
            const result = await CompanyService.updateById(company_data.data);
            resp.status(200).send(makeSuccessResponse(makeDMLQueryResult(result[0])));
        } else {
            resp.status(500).send(makeFailureResponse(InternalServerError(company_data.error)));
        }
    });

    app.delete("/company/:id", async (req, resp) => {
        const id_param = req.params.id;
        const result = await CompanyService.deleteById(parseInt(id_param));
        resp.status(200).send(makeSuccessResponse(makeDMLQueryResult(result)));
    });

    app.get("/company/:id", async (req, resp) => {
        const id_param = req.params.id;
        const company = await CompanyService.readById(parseInt(id_param));

        if(company) {
            resp.status(200).send(makeSuccessResponse(company.dataValues));
        } else {
            resp.status(404).send(makeFailureResponse(NotFoundException("company", "id", id_param)));
        }
    });

    app.get("/companies", async (req, resp) => {
        const companies = await CompanyService.readAll();

        if(companies) {
            resp.status(200).send(makeSuccessResponse(UnwrapModelList(companies)));
        } else {
            resp.status(404).send(makeFailureResponse(NoDataFoundReadAll("companies")));
        }
    });

    app.get("/companies/search", async (req, resp) => {
        const name = req.query.name as string;
        if (!name || typeof name !== "string") {
            resp.status(400).send(makeFailureResponse("Invalid search phrase"));
        } else {
            const companies = await CompanyService.searchByName(name);
            if (companies) {
                resp.status(200).send(makeSuccessResponse(companies));
            } else {
                resp.status(400).send(makeFailureResponse("Something went wrong during the search process"));
            }
        }
    });
}