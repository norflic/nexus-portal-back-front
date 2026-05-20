import {CreateDefenseZod, DefenseZod} from "../model/Defense.js";
import {app} from "../index.js";
import DefenseService from "../services/DefenseService.js";
import ResponseService from "../services/ResponseService.js";
import {BadRequest, InternalServerError, NoDataFoundReadAll} from "../utils/HttpErrors.js";
import {makeDMLQueryResult} from "../utils/DMLQueryResult.js";
import {NotFoundException} from "../exceptions/AuthExceptions.js";
import {UnwrapModelList} from "../utils/UnwrapModelList.js";

const { makeSuccessResponse, makeFailureResponse } = ResponseService;

export default function DefineDefenseEndpoints() {
    // CREATE
    app.post("/defense", async (req, resp) => {
        const req_data = req.body["data"];
        const defense_data = CreateDefenseZod.safeParse(req_data);
        if (defense_data.success) {
            const result = await DefenseService.create(defense_data.data);
            resp.status(200).send(makeSuccessResponse(result));
        } else {
            resp.status(400).send(makeFailureResponse(BadRequest(defense_data.error)));
        }
    });

    // UPDATE ALL FIELDS
    app.put("/defense", async (req, resp) => {
        const req_data = req.body["data"];
        const defense_data = DefenseZod.safeParse(req_data);

        if(defense_data.success) {
            const result = await DefenseService.updateById(defense_data.data);
            resp.status(200).send(makeSuccessResponse(makeDMLQueryResult(result[0])));
        } else {
            resp.status(500).send(makeFailureResponse(InternalServerError(defense_data.error)));
        }
    });

    app.delete("/defense/:id", async (req, resp) => {
        const id_param = req.params.id;
        const result = await DefenseService.deleteById(parseInt(id_param));
        resp.status(200).send(makeSuccessResponse(makeDMLQueryResult(result)));
    });

    app.get("/defense/:id", async (req, resp) => {
        const id_param = req.params.id;
        const defense = await DefenseService.readById(parseInt(id_param));
        if(defense) {
            resp.status(200).send(makeSuccessResponse(defense.dataValues));
        } else {
            resp.status(404).send(makeFailureResponse(NotFoundException("Defense", "id", id_param)));
        }
    });

    app.get("/defense/cascade/:id", async (req, resp) => {
        const id_param = req.params.id;
        const defense = await DefenseService.readCascadeById(parseInt(id_param));
        if(defense) {
            resp.status(200).send(makeSuccessResponse(defense));
        } else {
            resp.status(404).send(makeFailureResponse(NotFoundException("Defense", "id", id_param)));
        }
    })

    app.get("/defenses", async (req, resp) => {
        const defenses = await DefenseService.readAll();
        if(defenses) {
            resp.status(200).send(makeSuccessResponse(UnwrapModelList(defenses)));
        } else {
            resp.status(404).send(makeFailureResponse(NoDataFoundReadAll("defenses")));
        }
    });

    /**
     * @author Nils
     */
    app.post("/defenses/getByDate", async (req, resp) => {
        const req_data = req.body["data"];

        const year = req_data["year"];
        const month = req_data["month"];

        if (!(year && month && typeof year == "number" && typeof month == "number")) {
            resp.status(404).send(makeFailureResponse(BadRequest("year and month are needed as numbers inside data in the request body")));
        }

        const defenses = await DefenseService.readByDate(year, month);
        resp.status(200).send(makeSuccessResponse(defenses));
    });

    app.post("/defenses/getByDateCascade", async (req, resp) => {
        const req_data = req.body["data"];

        const year = req_data["year"];
        const month = req_data["month"];

        if (!(year && month && typeof year == "number" && typeof month == "number")) {
            resp.status(404).send(makeFailureResponse(BadRequest("year and month are needed as numbers inside data in the request body")));
        }
        const defense = await DefenseService.readCascadesByDate(year, month);
        if (defense) {
            resp.status(200).send(makeSuccessResponse(defense));
        } else {
            resp.status(404).send(makeFailureResponse(NotFoundException("Defense", `yearand month`, `${year} ; ${month}`)));
        }
    })

}
