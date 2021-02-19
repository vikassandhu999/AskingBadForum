export class BaseError {
    public httpCode: number;
    public error: Object;

    constructor(error : Object, httpCode: number) {
        this.httpCode = httpCode ?? 500;
        this.error = error;
    }
}