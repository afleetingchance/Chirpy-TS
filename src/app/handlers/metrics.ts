import { config } from "../../config.js"
import { Request, Response } from "express"
import { truncateUsers } from "../../db/queries/users.js"

export function handlerGetMetrics(req: Request, res: Response) {
    res.set("Content-Type", "text/html; charset=utf-8")
    res.send(`
        <html>
            <body>
                <h1>Welcome, Chirpy Admin</h1>
                <p>Chirpy has been visited ${config.api.fileserverHits} times!</p>
            </body>
        </html>
    `)
}

export async function handlerResetMetrics(req: Request, res: Response) {
    if (config.api.platform !== "dev") {
        res.status(403).send();
        return;
    }

    await truncateUsers();
    config.api.fileserverHits = 0;
    res.send()
}