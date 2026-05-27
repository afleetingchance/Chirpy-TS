import { config } from "../config.js"
import { Request, Response } from "express"

export function handlerGetMetrics(req: Request, res: Response) {
    res.set("Content-Type", "text/plain; charset=utf-8")
    res.send(`Hits: ${config.fileserverHits}`)
}

export function handlerResetMetrics(req: Request, res: Response) {
    config.fileserverHits = 0;
    res.send()
}