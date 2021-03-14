import {BaseError} from "../../../../shared/core/BaseError";
import {HttpErrors} from "../../../../shared/infra/http/errorCode";

export class UsernameDoesNotExistError extends BaseError {
    constructor() {
        super("Username doesn't exist" ,HttpErrors.NOT_FOUND ,{userName : "Username doesn't exist"});
    }
}