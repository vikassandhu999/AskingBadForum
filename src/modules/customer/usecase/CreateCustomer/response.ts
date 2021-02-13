import {BaseError} from "../../../../shared/core/BaseError";
import {BaseResponse} from "../../../../shared/core/BaseResponse";

export class EmailAlreadyExistError extends BaseError {
    constructor(email: string) {
        super(`Email ${email} already associated with another account`, "email", 403);
    }
}

export class CreateCustomerResponse extends BaseResponse {
    constructor() {
        super("Customer Created Successfully", 200);
    }
}
