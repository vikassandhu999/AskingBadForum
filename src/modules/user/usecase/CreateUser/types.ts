import {BaseError} from "../../../../shared/core/BaseError";

export type CreateUserDTO = {
    userName: string;
    fullName: string;
    email: string;
    password: string;
}

export class CreateUserResponse {
    status : string = "success";
}

export class UsernameAlreadyTakenError extends BaseError {
    constructor() {
        super({userName : "Username already taken"}, 400);
    }
}

export class EmailAlreadyExistError extends BaseError {
    constructor() {
        super({email : "Email already exist"}, 400);
    }
}