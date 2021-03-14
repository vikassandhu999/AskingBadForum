export class BaseError {
    public httpCode: number;
    public message: string;
    public errorInfo: any;
    constructor(message: string, httpCode: number, errorInfo: any) {
        this.httpCode = httpCode ?? 500;
        this.message = message;
        this.errorInfo = errorInfo;
    }
}