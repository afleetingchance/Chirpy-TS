import { Request, Response } from "express";
import { BadRequestError, NotFoundError } from "../errorClasses.js";
import { NewChirp } from "../../db/schema.js";
import { createChirp, getChirp, getChirpList } from "../../db/queries/chirps.js";

export async function handlerGetChirpList(req: Request, res: Response) {
    res.header("Content-Type", "application/json");

    const chirps = await getChirpList();
    res.status(200).send(JSON.stringify(chirps))
}

export async function handlerGetChirp(req: Request, res: Response) {
    res.header("Content-Type", "application/json");

    const id = req.params.id

    if (Array.isArray(id)) {
        throw new BadRequestError("can only fetch one chirp")
    }

    const chirp = await getChirp(id);

    if (chirp === undefined) {
        throw new NotFoundError(`${id} chirp not found`);
    }

    res.status(200).send(JSON.stringify(chirp))
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