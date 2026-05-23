import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
    base: "/",
    plugins: [react(), tailwindcss()],
    // Autoriser l'accès depuis le host utilisé via Traefik
    // Vite n'a pas toujours la même API selon la version pour `allowedHosts` (historique webpack),
    // donc on définit l'option `server` courante :
    server: {
        // bind à toutes les interfaces (déjà passé via npm script --host 0.0.0.0)
        host: true,
        // autoriser explicitement l'hôte que Traefik utilise (mode Docker)
        // `allowedHosts` n'est pas strictement nécessaire dans toutes les versions de Vite,
        // mais le cast en any évite les erreurs de typage si l'option n'existe pas.
        // On ajoute aussi CORS pour faciliter les requêtes cross-origin.
        // Remplacez ou étendez la liste si vous avez d'autres hosts à autoriser.
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        // @ts-ignore
        allowedHosts: ["nexus-portal.portfolio.a4r.fr", "localhost"] as any,
        cors: true,
        // HMR (websocket) settings when serving behind Traefik / a reverse proxy.
        // Only active in Docker containers (NODE_ENV=production) to avoid breaking local dev.
        // In local dev (NODE_ENV=development), Vite auto-detects localhost:5173.
        hmr:
            process.env.NODE_ENV === "production"
                ? {
                      protocol: "ws",
                      host: "nexus-portal.portfolio.a4r.fr",
                      port: 80,
                  }
                : false,
    },
});
