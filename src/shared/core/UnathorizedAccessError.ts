import {BaseError} from "./BaseError";
import {HttpErrors} from "../infra/http/errorCode";

export class UnauthorizedAccessError extends BaseError {
    constructor() {
        super("Unauthorized", HttpErrors.PERMISSION_DENIED);
    }
}