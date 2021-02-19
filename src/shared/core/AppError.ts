import {BaseError} from "./BaseError";

export class AppError extends BaseError {
    constructor() {
        super({message : "Internal Error" }, 500);
    }
}