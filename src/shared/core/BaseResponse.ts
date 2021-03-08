export abstract class BaseResponse<T = {}> {
    message: string;
    data?: T;
    httpCode: number;

    constructor(message: string, httpCode: number, data?: T) {
        this.message = message;
        this.httpCode = httpCode;
        this.data = data ?? undefined;
    }
}