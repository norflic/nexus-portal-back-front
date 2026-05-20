import { NexusPortalException } from "../types/Exceptions.js";
import { FailureResponse, SuccessResponse } from "../types/Responses.js";

function makeFailureResponse(
    error: string | NexusPortalException | Error,
): FailureResponse {
    const errorObject = typeof error == "string" ? { message: error } : error;

    return {
        ok: false,
        error: errorObject,
    };
}

function makeSuccessResponse<T>(data: T): SuccessResponse<T> {
    return {
        ok: true,
        data,
    };
}

const ResponseService = {
    makeFailureResponse,
    makeSuccessResponse,
};

export default ResponseService;