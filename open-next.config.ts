import { defineCloudflareConfig } from "@opennextjs/cloudflare";

// Config por defecto: sirve la app desde Cloudflare Workers usando el
// caché en memoria del propio Worker. Si más adelante se necesita ISR
// persistente entre despliegues, se agrega aquí un incrementalCache
// respaldado por KV o R2 (ver docs de @opennextjs/cloudflare).
export default defineCloudflareConfig();
