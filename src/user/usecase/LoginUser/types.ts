import {BaseError} from "../../../shared/core/BaseError";
import {HttpErrors} from "../../../shared/infra/http/errorCode";

export type LoginUserDTO = {
    email : string;
    password : string;
}

export class LoginUserResponse {
    constructor(public accessToken : string, public refreshToken : string) {
    }
}

export class EmailOrPasswordDidNotMatchError extends BaseError {
    constructor() {
        super("Email or Password didn't match", HttpErrors.UNAUTHENTICATED);
    }
}

export class EmailNotVerifiedError extends BaseError {
    constructor() {
        super("Email is not verified", HttpErrors.PERMISSION_DENIED , {email : "Email address is not verified"});
    }
}