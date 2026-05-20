import type {DataProvider, Identifier} from "react-admin";
import {HttpError} from "react-admin";
import {adminResourceByName} from "./adminResources";
import {fetchEndpoint} from "../../utils/endpoint";
import {OfferZod} from "../../models/Offer";
import {ClassGroupZod} from "../../models/ClassGroup";
import {CompanyZod, CreateCompanyZod} from "../../models/Company";
import {DefenseZod} from "../../models/Defense";
import {z as zod} from "zod";

type AdminPayload = Record<string, unknown>;

type AdminRecord = AdminPayload & {
    id: Identifier;
};

type AdminDataProvider = DataProvider;

type GetListParams = Parameters<NonNullable<AdminDataProvider["getList"]>>[1];
type GetOneParams = Parameters<NonNullable<AdminDataProvider["getOne"]>>[1];
type GetManyParams = Parameters<NonNullable<AdminDataProvider["getMany"]>>[1];
type GetManyReferenceParams = Parameters<NonNullable<AdminDataProvider["getManyReference"]>>[1];
type UpdateParams = Parameters<NonNullable<AdminDataProvider["update"]>>[1];
type UpdateManyParams = Parameters<NonNullable<AdminDataProvider["updateMany"]>>[1];
type CreateParams = Parameters<NonNullable<AdminDataProvider["create"]>>[1];
type DeleteParams = Parameters<NonNullable<AdminDataProvider["delete"]>>[1];
type DeleteManyParams = Parameters<NonNullable<AdminDataProvider["deleteMany"]>>[1];

const inferId = (
    record: AdminPayload,
    index: number,
): number | string => {
    const directId = record.id;
    if (typeof directId === "number" || typeof directId === "string") {
        return directId;
    }

    const uid = record.uid;
    if (typeof uid === "number" || typeof uid === "string") {
        return uid;
    }

    return `generated-${index}`;
};

const AdminRecordZod = zod.object({
    date_posted: zod
        .string()
        .refine((val) => !isNaN(Date.parse(val)), "Invalid date format")
        .transform((val) => new Date(val)),
});

// Map resources to response/request schemas. No cascade logic for defenses per current instruction.
const getResponseSchema = (resource: string) => {
    switch (resource) {
        case "classgroups":
            return ClassGroupZod;
        case "companies":
            return CompanyZod;
        case "defenses":
            return DefenseZod;
        case "offers":
            return OfferZod;
        default:
            return undefined;
    }
};

const getRequestSchema = (resource: string, method: "create" | "update") => {
    switch (resource) {
        case "classgroups": {
            const CreateClassGroupZod = ClassGroupZod.omit({id: true});
            if (method === "create") return CreateClassGroupZod;
            return CreateClassGroupZod.partial().and(zod.object({id: zod.number().or(zod.string())}));
        }
        case "companies": {
            if (method === "create") return CreateCompanyZod;
            return CreateCompanyZod.partial().and(zod.object({id: zod.number().or(zod.string())}));
        }
        case "defenses": {
            const CreateDefenseZod = DefenseZod.omit({id: true});
            if (method === "create") return CreateDefenseZod;
            return CreateDefenseZod.partial().and(zod.object({id: zod.number().or(zod.string())}));
        }
        case "offers": {
            const CreateOfferZod = OfferZod.omit({id: true});
            if (method === "create") return CreateOfferZod;
            return CreateOfferZod.partial().and(zod.object({id: zod.number()}));
        }
        default:
            return undefined;
    }
};

const normalizeRecord = (
    item: unknown,
    index: number,
    resource?: string,
): AdminRecord => {
    if (typeof item !== "object" || item === null) {
        return {id: `generated-${index}`, value: item};
    }

    const record = item as AdminPayload;

    const schema = resource ? getResponseSchema(resource) : undefined;
    if (schema) {
        const parsed = schema.safeParse(record);
        if (!parsed.success) {
            throw new HttpError(`Invalid ${resource} record data`, 400, parsed.error);
        }

        return {
            ...parsed.data,
            id: inferId(record, index),
        };
    }

    // Fallback to AdminRecordZod for loose parsing (e.g. date_posted)
    const validatedRecord = AdminRecordZod.safeParse(record);
    if (!validatedRecord.success) {
        // Return original record but ensure an id exists
        return {id: inferId(record, index), ...record};
    }

    return {
        ...validatedRecord.data,
        id: inferId(record, index),
    };
};

const resolvePaths = (resourceName: string) => {
    const resource = adminResourceByName.get(resourceName);

    if (!resource) {
        throw new HttpError(
            `Unknown admin resource: ${resourceName}`,
            400,
            {resourceName},
        );
    }

    return resource;
};

const requestJson = async <T, TBody extends Record<string, unknown> | undefined = undefined>(
    method: "GET" | "POST" | "PUT" | "DELETE",
    endpoint: string,
    options?: {
        body?: TBody;
    },
): Promise<T> => {
    try {
        return await fetchEndpoint<T, TBody>(method.toLowerCase() as "get" | "post" | "put" | "delete", endpoint, options);
    } catch (error) {
        const status =
            typeof error === "object" &&
            error !== null &&
            "status" in error &&
            typeof (error as { status?: unknown }).status === "number"
                ? (error as { status: number }).status
                : 500;

        const message =
            typeof error === "object" &&
            error !== null &&
            "message" in error &&
            typeof (error as { message?: unknown }).message === "string"
                ? (error as { message: string }).message
                : "Request failed";

        throw new HttpError(message, status, error);
    }
};

const normalizeMany = (items: unknown[], resource?: string): AdminRecord[] =>
    items.map((item, index) => normalizeRecord(item, index, resource));

const coercePayloadForResource = (
    resource: string,
    payload: AdminPayload,
): AdminPayload => {
    const nextPayload = {...payload};

    // Form-only helper value, should never be posted to API.
    if ("json" in nextPayload) {
        delete nextPayload.json;
    }

    // CompanyZod expects id as string.
    if (resource === "companies" && nextPayload.id !== undefined) {
        nextPayload.id = String(nextPayload.id);
    }

    // Convert Date objects to ISO strings for backend compatibility
    // Handle common date field names across resources
    const dateFields = ["date_posted", "date", "createdAt", "updatedAt"];
    dateFields.forEach((field) => {
        if (field in nextPayload && nextPayload[field] instanceof Date) {
            nextPayload[field] = (nextPayload[field] as Date).toISOString();
        }
    });

    return nextPayload;
};

const readOne = async (
    resource: string,
    id: Identifier,
): Promise<AdminRecord> => {
    const {singularPath} = resolvePaths(resource);
    const row = await requestJson<unknown>("GET", `${singularPath}/${id}`);

    return normalizeRecord(row, 0, resource);
};

const updateOne = async (
    resource: string,
    id: Identifier,
    data: AdminPayload,
    previousData?: AdminPayload,
): Promise<AdminRecord> => {
    const {singularPath} = resolvePaths(resource);
    const payload = {
        ...(previousData ?? {}),
        ...data,
        id: data.id ?? id,
    } as AdminPayload;

    // Use resource-specific request schema when available
    const reqSchema = getRequestSchema(resource, "update");
    if (reqSchema) {
        const parsed = reqSchema.safeParse(payload);
        if (!parsed.success) {
            throw new HttpError(`Invalid ${resource} update payload`, 400, parsed.error);
        }
        const coercedPayload = coercePayloadForResource(resource, parsed.data);
        await requestJson<unknown, { data: AdminPayload }>("PUT", singularPath, {
            body: {data: coercedPayload},
        });

        return normalizeRecord(coercedPayload, 0, resource);
    }

    // Fallback: generic validation
    const validatedPayload = AdminRecordZod.safeParse(payload);
    if (!validatedPayload.success) {
        throw new HttpError("Invalid record data", 400, validatedPayload.error);
    }

    const coercedPayload = coercePayloadForResource(resource, validatedPayload.data);

    await requestJson<unknown, { data: AdminPayload }>("PUT", singularPath, {
        body: {data: coercedPayload},
    });

    return normalizeRecord(coercedPayload, 0, resource);
};

const deleteOne = async (resource: string, id: Identifier): Promise<void> => {
    const {singularPath} = resolvePaths(resource);
    await requestJson<unknown>("DELETE", `${singularPath}/${id}`);
};


const adminDataProvider = {
    getList: async <RecordType extends AdminRecord = AdminRecord>(
        resource: string,
        params: GetListParams,
    ) => {
        const {pluralPath} = resolvePaths(resource);
        const rows = await requestJson<unknown[]>("GET", pluralPath);
        const normalized = normalizeMany(rows, resource);

        const page = params.pagination?.page ?? 1;
        const perPage = params.pagination?.perPage ?? normalized.length;
        const start = (page - 1) * perPage;
        const end = start + perPage;

        return {
            data: normalized.slice(start, end) as unknown as RecordType[],
            total: normalized.length,
        };
    },

    getOne: async <RecordType extends AdminRecord = AdminRecord>(
        resource: string,
        params: GetOneParams,
    ) => ({
        data: (await readOne(resource, params.id)) as unknown as RecordType,
    }),

    getMany: async <RecordType extends AdminRecord = AdminRecord>(
        resource: string,
        params: GetManyParams,
    ) => {
        const records = await Promise.all(
            params.ids.map(async (id) => await readOne(resource, id)),
        );

        return {data: records as unknown as RecordType[]};
    },

    getManyReference: async <RecordType extends AdminRecord = AdminRecord>(
        resource: string,
        params: GetManyReferenceParams,
    ) => {
        const {pluralPath} = resolvePaths(resource);
        const rows = await requestJson<unknown[]>("GET", pluralPath);
        const normalized = normalizeMany(rows, resource);

        const filtered = normalized.filter(
            (record: AdminRecord) =>
                params.target in record &&
                record[params.target as keyof AdminRecord] === params.id,
        );

        const page = params.pagination?.page ?? 1;
        const perPage = params.pagination?.perPage ?? filtered.length;
        const start = (page - 1) * perPage;
        const end = start + perPage;

        return {
            data: filtered.slice(start, end) as unknown as RecordType[],
            total: filtered.length,
        };
    },

    update: async <RecordType extends AdminRecord = AdminRecord>(
        resource: string,
        params: UpdateParams,
    ) => {
        const data = await updateOne(
            resource,
            params.id,
            params.data as AdminPayload,
            params.previousData as AdminPayload | undefined,
        );

        return {data: data as unknown as RecordType};
    },

    updateMany: async (
        resource: string,
        params: UpdateManyParams,
    ) => {
        await Promise.all(
            params.ids.map((id) =>
                updateOne(resource, id, {
                    ...(params.data as AdminPayload),
                    id,
                }),
            ),
        );

        return {data: params.ids};
    },

    create: async <
        RecordType extends Omit<AdminRecord, "id"> = Omit<AdminRecord, "id">,
        ResultRecordType extends AdminRecord = RecordType & { id: Identifier },
    >(
        resource: string,
        params: CreateParams,
    ) => {
        // Validate create payload with resource-specific schema
        const createSchema = getRequestSchema(resource, "create");
        if (createSchema) {
            const parsed = createSchema.safeParse(params.data);
            if (!parsed.success) {
                throw new HttpError(`Invalid ${resource} create payload`, 400, parsed.error);
            }
            params.data = parsed.data as AdminPayload;
        }

        const {singularPath} = resolvePaths(resource);
        const payload = coercePayloadForResource(resource, params.data as AdminPayload);

        const created = await requestJson<unknown, { data: AdminPayload }>(
            "POST",
            singularPath,
            {
                body: {data: payload},
            },
        );

        return {
            data: normalizeRecord(created, 0, resource) as unknown as ResultRecordType,
        };
    },

    delete: async <RecordType extends AdminRecord = AdminRecord>(
        resource: string,
        params: DeleteParams,
    ) => {
        await deleteOne(resource, params.id);

        return {
            data: (params.previousData ?? {id: params.id}) as unknown as RecordType,
        };
    },

    deleteMany: async (
        resource: string,
        params: DeleteManyParams,
    ) => {
        await Promise.all(
            params.ids.map((id) =>
                deleteOne(resource, id),
            ),
        );

        return {data: params.ids};
    },
} satisfies AdminDataProvider;

export default adminDataProvider;
