import {BaseError} from "../../../../shared/core/BaseError";
import {BaseResponse} from "../../../../shared/core/BaseResponse";
import {CustomerDTO} from "../../dto/CustomerProfile";

export class UserProfileDoesNotExistError extends BaseError {
    constructor() {
        super(`User profile doesn't exist`, "profile", 404);
    }
}

export class GetCustomerProfileResponse extends BaseResponse<CustomerDTO> {
    constructor(profile: CustomerDTO) {
        super("Customer Created Successfully", 200, profile);
    }
}
