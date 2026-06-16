import { Request, Response } from "express";
import { BadRequestError, UnauthorizedError } from "../errorClasses.js";
import { getUserByEmail } from "../../db/queries/users.js";
import { checkPasswordHash } from "../auth.js";
import { UserResponse } from "../../db/schema.js";


type ReqBody = {
    "email": string,
    "password": string
}

export async function handlerLogin(req: Request, res: Response) {
    const reqBody: ReqBody = req.body

    if (!isValidBody(reqBody)) {
        throw new BadRequestError("missing email or password");
    }

    const user = await getUserByEmail(reqBody.email);
    
    if (!user || !(await checkPasswordHash(reqBody.password, user.hashed_password))) {
        throw new UnauthorizedError("incorrect email or password")
    }

    const { hashed_password, ...userRes } = user

    res.status(200).send(JSON.stringify(userRes as UserResponse))
}

function isValidBody(body: ReqBody): boolean {
    return "email" in body && typeof body.email === "string"
        && "password" in body && typeof body.password === "string";
}