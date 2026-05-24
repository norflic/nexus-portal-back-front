import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
    base: "/",
    plugins: [react(), tailwindcss()],
    server: {
        host: true,
        // Authorize the Traefik host
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        // @ts-ignore
        allowedHosts: ["nexus-portal.portfolio.a4r.fr", "localhost"] as any,
        cors: true,
        // Disable HMR (Hot Module Replacement) since we're behind Traefik
        hmr: false,
    },
});
