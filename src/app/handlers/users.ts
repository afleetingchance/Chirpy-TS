import { Request, Response } from "express";
import { createUser } from "../../db/queries/users.js";
import { NewUser } from "../../db/schema.js";

export async function handlerCreateUser(req: Request, res: Response) {
    const user = await createUser(req.body as NewUser);

    res.set("Content-Type", "application/json")
    res.status(201).send(JSON.stringify(
        {
            id: user.id,
            email: user.email,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        }
    ));
}