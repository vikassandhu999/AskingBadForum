import {BaseError} from "../../../../shared/core/BaseError";
import {User} from "../../domain/User";
import {HttpErrors} from "../../../../shared/infra/http/errorCode";

export type SendVerificationEmailDTO = {
    email : string;
}

export class SendVerificationEmailResponse {
    status: string = "success";
}

export class UserEmailDoesNotExistError extends BaseError {
    constructor() {
        super("Email doesn't exist", HttpErrors.NOT_FOUND , {email : "Email doesn't exist"});
    }
}

export class UnableToSendEmailError extends BaseError {
    constructor() {
        super("Unable to send verification email" , HttpErrors.UNKNOWN);
    }
}