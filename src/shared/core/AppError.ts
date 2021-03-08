import { BaseError } from "./BaseError";
import { HttpErrors } from "../infra/http/errorCode";

export class AppError extends BaseError {
    constructor() {
        super("Internal error", HttpErrors.UNKNOWN);
    }
}