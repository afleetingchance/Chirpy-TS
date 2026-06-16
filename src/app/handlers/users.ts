import { Request, Response } from "express";
import { createUser } from "../../db/queries/users.js";
import { NewUser, UserResponse } from "../../db/schema.js";
import { BadRequestError } from "../errorClasses.js";
import { hashPassword } from "../auth.js";

type CreateUserBody = {
    email: string;
    password: string;
}

export async function handlerCreateUser(req: Request, res: Response) {
    const reqBody: CreateUserBody = req.body;

    if (!isValidCreateBody(reqBody)) {
        throw new BadRequestError("missing email or password");
    }

    const createUserInput: NewUser = {
        email: reqBody.email,
        hashed_password: await hashPassword(reqBody.password),
    };

    const user = await createUser(createUserInput);
    const { hashed_password, ...userRes } = user


    res.set("Content-Type", "application/json")
    res.status(201).send(JSON.stringify(userRes as UserResponse));
}

function isValidCreateBody(body: CreateUserBody): boolean {
    return "email" in body && typeof body.email === "string"
        && "password" in body && typeof body.password === "string";
}