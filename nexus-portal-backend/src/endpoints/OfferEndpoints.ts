import { NotFoundException } from "../exceptions/AuthExceptions.js";
import { app } from "../index.js";
import {
    CreateOfferWithTagsZod,
    OfferModel,
    OfferSequelize,
    OfferWithTagsModel,
    UpdateOfferZod,
} from "../model/Offer.js";
import { TagSequelize } from "../model/Tag.js";
import ResponseService from "../services/ResponseService.js";
import { makeDMLQueryResult } from "../utils/DMLQueryResult.js";
import { BadRequest, InternalServerError, NoDataFoundReadAll } from "../utils/HttpErrors.js";
import { UnwrapModelList } from "../utils/UnwrapModelList.js";
import { cleanObject } from "../utils/cleanObject.js";

export default function DefineOfferEndpoints() {
    const { makeSuccessResponse, makeFailureResponse } = ResponseService;
    // CREATE
    app.post("/offer", async (req, resp) => {
        const req_data = req.body["data"];
        const createOffer = CreateOfferWithTagsZod.safeParse(req_data);
        if (!createOffer.success) {
            resp.status(400).send(makeFailureResponse(BadRequest(createOffer.error)));
            return;
        }

        const { tags, ...offerData } = createOffer.data;
        const result = (await OfferSequelize.create(offerData)) as OfferModel;

        await result.addTags(tags);

        resp.status(200).send(makeSuccessResponse(result.dataValues));
    });

    // UPDATE ALL FIELDS
    app.put("/offer", async (req, resp) => {
        const req_data = req.body["data"];

        const offerData = UpdateOfferZod.safeParse(req_data);

        if (offerData.success) {
            const { id, ...updateData } = offerData.data;
            const u = cleanObject(updateData);
            const result = await OfferSequelize.update(cleanObject(updateData), {
                where: {
                    id: id,
                },
            });
            resp.status(200).send(makeSuccessResponse(makeDMLQueryResult(result[0])));
        } else {
            resp.status(500).send(makeFailureResponse(InternalServerError(offerData.error)));
        }
    });

    app.delete("/offer/:id", async (req, resp) => {
        const id_param = req.params.id;

        const result = await OfferSequelize.destroy({
            where: {
                id: id_param,
            },
        });

        resp.status(200).send(makeSuccessResponse(makeDMLQueryResult(result)));
    });

    app.get("/offer/:id", async (req, resp) => {
        const id_param = req.params.id;
        const Offer = (await OfferSequelize.findOne({
            where: {
                id: id_param,
            },
            include: { model: TagSequelize, as: "tags" },
        })) as OfferWithTagsModel;

        if (Offer) {
            resp.status(200).send(makeSuccessResponse(Offer.dataValues));
        } else {
            resp.status(404).send(makeFailureResponse(NotFoundException("offfer", "id", id_param)));
        }
    });

    app.get("/offers", async (req, resp) => {
        const Offers = await OfferSequelize.findAll({
            include: { model: TagSequelize, as: "tags" },
        });

        if (Offers) {
            resp.status(200).send(makeSuccessResponse(UnwrapModelList(Offers)));
        } else {
            resp.status(404).send(makeFailureResponse(NoDataFoundReadAll("offers")));
        }
    });
}

