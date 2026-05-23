const defaultAllowedOrigins = ["http://localhost:5173"];

const extraAllowedOrigins = process.env.ALLOWED_ORIGINS
    ?.split(",")
    .map((origin: string) => origin.trim())
    .filter(Boolean) ?? [];

const frontendUrl = process.env.FRONTEND_URL?.trim();

const allowAllOrigins = extraAllowedOrigins.includes("*");

const allowedOrigins = new Set([
    ...defaultAllowedOrigins,
    ...extraAllowedOrigins.filter((origin: string) => origin !== "*"),
    ...(frontendUrl ? [frontendUrl] : []),
]);

export function isAllowedOrigin(origin?: string): boolean {
    return !origin || allowAllOrigins || allowedOrigins.has(origin);
}

