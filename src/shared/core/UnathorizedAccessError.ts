import {BaseError} from "./BaseError";

export class UnauthorizedAccessError extends BaseError {
    constructor() {
        super({message : "Don't permissions to access the resource"}, 409);
    }
}