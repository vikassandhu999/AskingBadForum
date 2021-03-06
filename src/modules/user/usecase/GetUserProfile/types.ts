import {BaseError} from "../../../../shared/core/BaseError";
import {HttpErrors} from "../../../../shared/infra/http/errorCode";

export class GetUserProfileResponse {
    status : string = "success";
    data : any;
    constructor(data : any) {
        this.data = data;
    }
}

export class ProfileNotFoundError extends BaseError {
    constructor() {
        super("Profile not found", HttpErrors.NOT_FOUND);
    }
}