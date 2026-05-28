import express from "express";
import middlewareLogResponses from "./app/middlewares/logResponses.js";
import middlewareMetricsInc from "./app/middlewares/metricsInc.js";
import middlewareErrors from "./app/middlewares/errors.js";
import handlerReadiness from "./app/handlers/readiness.js";
import { handlerGetMetrics, handlerResetMetrics } from "./app/handlers/metrics.js";
import { handlerValidateChirp } from "./app/handlers/chirps.js";

const app = express();
const PORT = 8080;

app.use(express.static("."));
app.use("/app", middlewareMetricsInc, express.static("./src/app"));

app.use(middlewareLogResponses);

app.get("/api/healthz", handlerReadiness);
app.post("/api/validate_chirp", express.json(), handlerValidateChirp);

app.get("/admin/metrics", handlerGetMetrics);
app.post("/admin/reset", handlerResetMetrics);

app.use(middlewareErrors)

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});