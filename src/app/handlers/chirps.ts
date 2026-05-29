import { Request, Response } from "express";
import { BadRequestError } from "../errorClasses.js";
import { NewChirp } from "../../db/schema.js";
import { createChirp, getChirpList } from "../../db/queries/chirps.js";

export async function handlerGetChirpList(req: Request, res: Response) {
    res.header("Content-Type", "application/json");

    const chirps = await getChirpList();
    res.status(200).send(JSON.stringify(chirps))
}

export async function handlerCreateChirp(req: Request, res: Response) {
    res.header("Content-Type", "application/json");

    const newChirp = validateChirp(req.body as NewChirp)
    const chirp = await createChirp(newChirp);
    
    res.status(201).send(JSON.stringify(
        {
            id: chirp.id,
            createdAt: chirp.createdAt,
            updatedAt: chirp.updatedAt,
            body: chirp.body,
            userId: chirp.userId,
        }
    ));
}

function validateChirp(chirp: NewChirp): NewChirp {
    const badWords = [
        "kerfuffle",
        "sharbert",
        "fornax"
    ];

    if (chirp.body.length > 140) {
        throw new BadRequestError("Chirp is too long. Max length is 140");
    }

    const pattern = new RegExp(`\\s(${badWords.join('|')})\\s`, "gi");
    chirp.body = chirp.body.replace(pattern, " **** ");

    return chirp;
}