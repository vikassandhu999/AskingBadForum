import {BaseError} from "../../../../shared/core/BaseError";
import {HttpErrors} from "../../../../shared/infra/http/errorCode";

export type VerifyUserEmailDTO = {
    verificationToken : string;
}

export class VerifyUserEmailResponse {
    status : string = "success";
}

export class InvalidVerificationTokenError extends BaseError {
    constructor() {
        super("Invalid verificationToken", HttpErrors.INVALID_ARGUMENT , {verificationToken : "Verification token is invalid"});
    }
}