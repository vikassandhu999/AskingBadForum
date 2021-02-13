import {BaseError} from "./BaseError";

export class UnauthorizedAccessError extends BaseError {
    constructor() {
        super(`You don't have permission to access the resource`, "accessType", 409);
    }
}