import { MigrationConfig } from "drizzle-orm/migrator";
import { envOrThrow } from "./helpers.js";

process.loadEnvFile();

type APIConfig = {
    fileserverHits: number;
    platform: string;
    port: number; 
};

type DBConfig = {
    url: string;
    migration: MigrationConfig
}

type Config = {
    api: APIConfig;
    db: DBConfig;
}

const migrationConfig: MigrationConfig = {
    migrationsFolder: "./src/db/migrations"
}

export const config: Config = {
    api: {
        fileserverHits: 0,
        platform: envOrThrow("PLATFORM"),
        port: Number(process.env["PORT"]) ?? "8080",
    },
    db: {
        url: envOrThrow("DB_URL"),
        migration: migrationConfig,
    },
}