import {v4 as uuid} from "uuid";

export type CommentDTO  = {
    userName : string;
    commentId : string;
    replyTo : string;
    body : string;
    createdAt : Date;
    updatedAt : Date;
}

export class Comment {
    public userName : string;
    public commentId : string;
    public replyTo : string;
    public body : string;
    public createdAt : Date;
    public updatedAt : Date;
    constructor(params : any) {
        this.userName = params.userName;
        this.commentId = params.commentId??uuid();
        this.replyTo = params.replyTo;
        this.body = params.body;
        this.createdAt = params.createdAt??new Date();
        this.updatedAt = params.updatedAt??new Date();
    }

    toDTO() : CommentDTO {
        return  {
            userName : this.userName,
            commentId : this.commentId,
            replyTo : this.replyTo,
            body : this.body,
            createdAt : this.createdAt,
            updatedAt : this.updatedAt
        }
    }
}