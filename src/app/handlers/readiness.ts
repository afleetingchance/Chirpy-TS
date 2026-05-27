import { Request, Response } from "express";

export default function handlerReadiness(req: Request, res: Response): void {
    res.set("Content-Type", "text/plain; charset=utf-8")
    res.send("OK")
}