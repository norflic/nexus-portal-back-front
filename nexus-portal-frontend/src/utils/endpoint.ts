import type {HTMLFormMethod} from "react-router";
import type {NexusPortalResponse} from "../models/Utility";

type QueryParams = { [key: string]: string } | [[string, string]];

const _url = import.meta.env.VITE_API_URL as string | undefined;
if (!_url) console.error("API_URL NOT DEFINED IN ENV");

export const fetchEndpoint = async <TReturn, TBody extends {} | undefined = undefined>(
    method: HTMLFormMethod,
    endpoint: string,
    options?: {
        queries?: QueryParams;
        body?: TBody;
    },
): Promise<TReturn> => {
    const url = `${_url}/${endpoint}${options?.queries ? new URLSearchParams(options.queries) : ""}`;

    const body: string | undefined = options?.body ? JSON.stringify(options.body) : undefined;
    const res = await fetch(url, {
        method,
        body,
        headers: {
            Accept: "application/json",
            ...(body ? { "Content-Type": "application/json" } : {}),
        },
    });

    const responseJson = (await res.json()) as NexusPortalResponse<TReturn>;

    if (!responseJson.ok) throw responseJson.error;

  return responseJson.data;
};

export const QUERY_KEYS = {
    OFFERS: "Offers",
    COMPANY: "Company",
    COMPANY_SEARCH: "CompanySearch",
} as const;

