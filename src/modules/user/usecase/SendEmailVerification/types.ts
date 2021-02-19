import {BaseError} from "../../../../shared/core/BaseError";
import {User} from "../../domain/User";

export type SendVerificationEmailDTO = {
    email : string;
}

export class SendVerificationEmailResponse {
    status: string = "success";
}

export class UserEmailDoesNotExistError extends BaseError {
    constructor() {
        super({email : "User email doesn't exist"}, 404);
    }
}

export class UnableToSendEmailError extends BaseError {
    constructor() {
        super({message : "Unable to send verification email"}, 500);
    }
}