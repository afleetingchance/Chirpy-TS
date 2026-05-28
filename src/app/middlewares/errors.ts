import { Request, Response, NextFunction } from "express";
import * as Errors from "../errorClasses.js";

export default function middlewareErrors(err: Error, req: Request, res: Response, next: NextFunction) {
    console.log(err.message);

    switch (err.constructor) {
        case Errors.BadRequestError:
            res.status(400).json({ error: err.message});
            return
        case Errors.UnauthorizedError:
            res.status(401).json({ error: err.message});
            return
        case Errors.ForbiddenError:
            res.status(403).json({ error: err.message});
            return
        case Errors.NotFoundError:
            res.status(404).json({ error: err.message});
            return
        default:
            res.status(500).json({ error: "Something went wrong on our end" });
    }
}