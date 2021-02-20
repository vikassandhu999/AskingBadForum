import {BaseError} from "../../../../shared/core/BaseError";

export class GetUserProfileResponse {
    status : string = "success";
    data : any;
    constructor(data : any) {
        this.data = data;
    }
}


export class ProfileNotFoundError extends BaseError {
    constructor() {
        super({message : "Profile not found"}, 404);
    }
}