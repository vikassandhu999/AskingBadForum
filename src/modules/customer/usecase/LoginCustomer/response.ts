import {BaseError} from "../../../../shared/core/BaseError";
import {BaseResponse} from "../../../../shared/core/BaseResponse";
import {LoginCustomerResponseDTO} from "./dto";

export class EmailOrPasswordDoesNotMatchError extends BaseError {
    constructor(email: string, password: string) {
        super(`Email ${email} and Password ${password} doesn't match`, "email & password", 409);
    }
}

export class EmailNotVerifiedError extends BaseError {
    constructor(email: string) {
        super(`Email ${email} is not verified`, "email", 409);
    }
}

export class LoginCustomerResponse extends BaseResponse<LoginCustomerResponseDTO> {
    constructor(data: LoginCustomerResponseDTO) {
        super("Logged In Successfully", 200, data);
    }
}
