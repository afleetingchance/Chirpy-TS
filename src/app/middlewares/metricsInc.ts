import { config } from "../../config.js";
import { Request, Response, NextFunction } from "express";

export default function middlewareMetricsInc(req: Request, res: Response, next: NextFunction) {
    config.api.fileserverHits++;
    next();
}