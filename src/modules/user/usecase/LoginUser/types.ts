import {BaseError} from "../../../../shared/core/BaseError";

export type LoginUserDTO = {
    email : string;
    password : string;
}

export class LoginUserResponse {
    constructor(public accessToken : string, public refreshToken : string) {
    }
}

export class EmailOrPasswordDidNotMatch extends BaseError {
    constructor() {
        super({error : "Email or Password didn't match"}, 403);
    }
}

export class EmailNotVerifiedError extends BaseError {
    constructor() {
        super({email : "email is not verified"}, 403);
    }
}