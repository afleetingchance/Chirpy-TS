import { Request, Response } from "express";
import { BadRequestError } from "../errorClasses.js";

export function handlerValidateChirp(req: Request, res: Response) {
    type reqBody = {
        body: string
    }
    
    type resData = {
        cleanedBody: string
    };

    type resError = {
        error: string
    };

    const badWords = [
        "kerfuffle",
        "sharbert",
        "fornax"
    ];

    res.header("Content-Type", "application/json");
    const body: reqBody = req.body

    if (body.body.length > 140) {
        throw new BadRequestError("Chirp is too long. Max length is 140")
    }

    const pattern = new RegExp(`\\s(${badWords.join('|')})\\s`, "gi");
    const cleanedBody = body.body.replace(pattern, " **** ")

    const resBody: resData = {
        cleanedBody
    }
    res.status(200).send(JSON.stringify(resBody));
}