import "dotenv/config";
/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./utils/schema.tsx",
    dialect: "postgresql",
    dbCredentials: {
        url: "postgresql://neondb_owner:npg_vE2JOskL3IYd@ep-shy-moon-a8uvw2bs-pooler.eastus2.azure.neon.tech/Ai_Content_Generator?sslmode=require"
    }
};
