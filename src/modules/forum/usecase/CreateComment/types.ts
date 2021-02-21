import {BaseError} from "../../../../shared/core/BaseError";
import {ThreadDTO} from "../../domain/Thread";
import {CommentDTO} from "../../domain/Comment";

export type CreateCommentDTO = {
    threadId : string;
    replyTo ?: string;
    body : string;
}


export class CommentIdDoesNotExistError extends BaseError {
    constructor() {
        super({message : "comment ID doesn't exist"}, 404);
    }
}


export class CreateCommentResponse {
    public status : string = "success";
    public data  : CommentDTO;
    constructor(data : CommentDTO) {
        this.data = data;
    }
}