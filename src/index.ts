import express from "express";
import middlewareLogResponses from "./app/middlewares/logResponses.js";
import middlewareMetricsInc from "./app/middlewares/metricsInc.js";
import handlerReadiness from "./app/handlers/readiness.js";
import { handlerGetMetrics, handlerResetMetrics } from "./app/handlers/metrics.js";

const app = express();
const PORT = 8080;

app.use(express.static("."));
app.use("/app", middlewareMetricsInc, express.static("./src/app"));

app.use(middlewareLogResponses);

app.get("/healthz", handlerReadiness);
app.get("/metrics", handlerGetMetrics);
app.get("/reset", handlerResetMetrics);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});