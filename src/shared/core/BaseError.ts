export class BaseError {
    public httpCode: number;
    public message: string;
    public errorInfo: Object | undefined;
    constructor(message: string, httpCode: number, errorInfo?: Object) {
        this.httpCode = httpCode ?? 500;
        this.message = message;
        this.errorInfo = errorInfo;
    }
}