import { BaseError } from "./BaseError";
import { HttpErrors } from "../infra/http/errorCode";


export class InvalidParamsError extends BaseError {
    constructor(validation: any) {
        super("Invalid parameters", HttpErrors.INVALID_ARGUMENT, validation);
    }
}
