import {BaseError} from "../../../../shared/core/BaseError";

export type VerifyUserEmailDTO = {
    verificationToken : string;
}

export class VerifyUserEmailResponse {
    status : string = "success";
}

export class InvalidVerificationTokenError extends BaseError {
    constructor() {
        super({verificationToken : "Invalid verificationToken"}, 404);
    }
}