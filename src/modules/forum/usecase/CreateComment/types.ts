import {BaseError} from "../../../../shared/core/BaseError";
import {CommentDTO} from "../../domain/Comment";

export type CreateCommentDTO = {
    postId : string;
    replyTo ?: string;
    body : string;
}

export class CommentDoesNotExistError extends BaseError {
    constructor() {
        super({message : "comment doesn't exist"}, 404);
    }
}

export class PostDoesNotExistError extends BaseError {
    constructor() {
        super({message : "post doesn't exist"}, 404);
    }
}

export class CreateCommentResponse {
    public status : string = "success";
    public data  : CommentDTO;
    constructor(data : CommentDTO) {
        this.data = data;
    }
}