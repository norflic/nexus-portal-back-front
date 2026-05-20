import zod from "zod";

export const DMLQueryResultZod = zod.object({
    affected_rows: zod.number()
});

export const makeDMLQueryResult = (n: number): DMLQueryResult => { return {affected_rows: n} }

export type DMLQueryResult = zod.infer<typeof DMLQueryResultZod>;