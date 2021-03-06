import {BaseError} from "../../../../shared/core/BaseError";
import { PostDTO } from "../../domain/Post";

export type CreatePostDTO = {
    title : string;
    body : string;
}

export class UserNameDoesNotExistError extends BaseError {
    constructor() {
        super({message : "your username doesn't exist"}, 403);
    }
}

export class PostDoesNotExistError extends BaseError {
    constructor() {
        super({message : "post doesn't exist"}, 403);
    }
}

export class CreatePostResponse {
    public status : string = "success";
    public data  : PostDTO;
    constructor(data : PostDTO) {
        this.data = data;
    }
}