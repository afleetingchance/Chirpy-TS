export function envOrThrow(key: string): string {
    const val = process.env[key];

    if (val === undefined) {
        throw new Error(`${key} not found in .env`)
    }

    return val
}