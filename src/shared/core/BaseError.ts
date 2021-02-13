export abstract class BaseError extends Error {
    public httpCode: number;
    public field: string;

    constructor(message: string, field: string, httpCode: number) {
        super(message);
        Error.captureStackTrace(this, BaseError);
        this.httpCode = httpCode ?? 500;
        this.field = field;
    }
}