import { NexusPortalException } from "./Exceptions.js";
type FailureResponse = {
    ok: false;
    error: NexusPortalException;
};

type SuccessResponse<T> = {
    ok: true;
    data: T;
};

type NexusPortalResponse<T> = FailureResponse | SuccessResponse<T>;

export type { FailureResponse, SuccessResponse, NexusPortalResponse };
