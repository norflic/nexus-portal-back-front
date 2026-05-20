export type Prettify<T> = {
    [K in keyof T]: T[K];
} & {};

export type SuccessfulResponse<T> = { ok: true; data: T };
export type FailureResponse = { ok: false; error: { message: string } };
export type NexusPortalResponse<T> = FailureResponse | SuccessfulResponse<T>;
