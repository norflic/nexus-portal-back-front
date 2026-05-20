import express from "express";
import UserService from "../services/UserService.js";
import ResponseService from "../services/ResponseService.js";
import {UserNotFound} from "../exceptions/UserExceptions.js";
import {UnwrapModelList} from "../utils/UnwrapModelList.js";
import {BadRequest, InternalServerError} from "../utils/HttpErrors.js";
import SettingsRepository from "../repository/SettingsRepository.js";
import UserRepository from "../repository/UserRepository.js";
import {NotFoundException} from "../exceptions/AuthExceptions.js";
import {SettingsSchema} from "../types/SettingsSet.js";
import {makeDMLQueryResult} from "../utils/DMLQueryResult.js";

const UserRouter = express.Router();
const { makeSuccessResponse, makeFailureResponse } = ResponseService;

UserRouter.get("/users", async (_req, res) => {
    const users = await UserService.getAll();
    res.status(200).send(makeSuccessResponse(users));
});

UserRouter.get("/user/:id", async (req, res) => {
    const id_param = req.params.id;
    const usr = await UserService.getOne(parseInt(id_param));
    if (usr) {
        res.status(200).send(usr);
    } else {
        res.status(404).send(makeFailureResponse(UserNotFound(id_param)));
    }
});

UserRouter.post("/user/:email", async (req, res) => {
    const email_param = req.params.email;
    const usr = await UserService.getOneByEmail(email_param);
    if (usr) {
        res.status(200).send(makeSuccessResponse(usr));
    } else {
        res.status(404).send(makeFailureResponse(UserNotFound(email_param)));
    }
});

UserRouter.get("/user/pipelinesteps/:id", async (req, res) => {
    const id_param = parseInt(req.params.id);
    const pipeline_steps = await UserService.getAllPipelineSteps(id_param);

    if (pipeline_steps) {
        res.status(200).send(makeSuccessResponse(UnwrapModelList(pipeline_steps)));
    } else {
        res.status(500).send(makeFailureResponse(InternalServerError()));
    }
});

UserRouter.get('/user/:id/settings', async (req, res) => {
    const id_param = req.params.id;
    const usr = await UserRepository.getUserById(parseInt(id_param))

    if (usr) {
        if (usr.dataValues.settings_id) {
            const settings = await SettingsRepository.getOne(usr.dataValues.settings_id);

            if (settings) {
                res.status(200).send(makeSuccessResponse(settings));
            } else {
                res.status(404).send(makeFailureResponse(NotFoundException("settings", "user_id", `${id_param}`)));
            }
        }
    }

});

UserRouter.get('/user/:email/settings', async (req, res) => {
    const email_param = req.params.email;
    const usr = await UserRepository.getUserByEmail(email_param);

    if (usr) {
        if (usr.dataValues.settings_id) {
            const settings = await SettingsRepository.getOne(usr.dataValues.settings_id);

            if (settings) {
                res.status(200).send(makeSuccessResponse(settings));
            } else {
                res.status(404).send(makeFailureResponse(NotFoundException("settings", "user_id", `${email_param}`)));
            }
        }
    }

});

UserRouter.post('/user/:email/settings', async (req, res) => {
    const email_param = req.params.email;
    const body = req.body;
    const settings_data = SettingsSchema.SettingsSetSchema.safeParse(body);

    if(settings_data.success) {
        const usr = await UserRepository.getUserById(parseInt(email_param));

        if (usr) {
            if(!usr.dataValues.settings_id) {
                const settings = await SettingsRepository.create(settings_data.data);
                usr.dataValues.settings_id = settings.dataValues.id
                await usr.save()
            } else {
                const result = await SettingsRepository.update(usr.dataValues.settings_id, settings_data.data);
                res.status(200).send(makeSuccessResponse(makeDMLQueryResult(result[0])));
            }
        } else {
            res.status(404).send(makeSuccessResponse(NotFoundException("user", "email", email_param)));
        }
    } else {
        res.status(400).send(makeFailureResponse(BadRequest(settings_data.error)))
    }
});

export default UserRouter;
