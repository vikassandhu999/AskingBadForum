import {BaseError} from "../../../../shared/core/BaseError";
import {ThreadDTO} from "../../domain/Thread";

export type CreateThreadDTO = {
    title : string;
    body : string;
}

export class UserNameDoesNotExistError extends BaseError {
    constructor() {
        super({message : "your username doesn't exist"}, 404);
    }
}


export class ThreadIdDoesNotExistError extends BaseError {
    constructor() {
        super({message : "thread ID doesn't exist"}, 404);
    }
}

export class CreateThreadResponse {
    public status : string = "success";
    public data  : ThreadDTO;
    constructor(data : ThreadDTO) {
        this.data = data;
    }
}