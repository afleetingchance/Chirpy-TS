import express from "express";
import postgres from "postgres";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import { drizzle } from "drizzle-orm/postgres-js";
import { config } from "./config.js";
import middlewareLogResponses from "./app/middlewares/logResponses.js";
import middlewareMetricsInc from "./app/middlewares/metricsInc.js";
import middlewareErrors from "./app/middlewares/errors.js";
import handlerReadiness from "./app/handlers/readiness.js";
import { handlerGetMetrics, handlerResetMetrics } from "./app/handlers/metrics.js";
import { handlerCreateUser } from "./app/handlers/users.js";
import { handlerCreateChirp, handlerGetChirp, handlerGetChirpList } from "./app/handlers/chirps.js";
import { handlerLogin } from "./app/handlers/login.js";

const app = express();

const migrationClient = postgres(config.db.url, { max: 1 });
await migrate(drizzle(migrationClient), config.db.migration);

app.use(express.static("."));
app.use("/app", middlewareMetricsInc, express.static("./src/app"));

app.use(middlewareLogResponses);

app.get("/api/healthz", handlerReadiness);
app.post("/api/login", express.json(), handlerLogin)
app.post("/api/users", express.json(), handlerCreateUser);
app.get("/api/chirps", express.json(), handlerGetChirpList);
app.get('/api/chirps/:id', express.json(), handlerGetChirp);
app.post("/api/chirps", express.json(), handlerCreateChirp);

app.get("/admin/metrics", handlerGetMetrics);
app.post("/admin/reset", handlerResetMetrics);

app.use(middlewareErrors)

app.listen(config.api.port, () => {
  console.log(`Server is running at http://localhost:${config.api.port}`);
});