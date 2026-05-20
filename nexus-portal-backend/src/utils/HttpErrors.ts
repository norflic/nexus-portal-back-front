export const NoDataFoundReadAll = (model: string) => { return `[All ${model}] : No data found.` };
export const BadRequest = (error: unknown) => { return `Bad Request : data is in invalid format.\n ${error}` };
export const InternalServerError = (error?: unknown) => { return `Internal Server Error.\n${error}` };