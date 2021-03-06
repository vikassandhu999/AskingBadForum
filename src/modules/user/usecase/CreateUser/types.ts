import {BaseError} from "../../../../shared/core/BaseError";
import { HttpErrors } from "../../../../shared/infra/http/errorCode";

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
        super("Username already exists" ,HttpErrors.ALREADY_EXISTS ,{userName : "Username already exists"});
    }
}

export class EmailAlreadyExistError extends BaseError {
    constructor() {
        super("Email already exists" ,HttpErrors.ALREADY_EXISTS ,{email : "Email already exists"});
    }
}