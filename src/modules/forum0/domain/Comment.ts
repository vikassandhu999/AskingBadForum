import {v4 as uuid} from "uuid";

export type CommentDTO  = {
    userId : string;
    userName : string;
    commentId : string;
    postId : string;
    replyTo ?: string;
    body : string;
    createdAt : Date;
    updatedAt : Date;
}

export class Comment {
    public userId : string;
    public userName : string;
    public commentId : string;
    public postId : string;
    public replyTo ?: string;
    public body : string;
    public createdAt : Date;
    public updatedAt : Date;
    constructor(params : any) {
        this.userId = params.userId;
        this.userName = params.userName;
        this.postId = params.postId;
        this.commentId = params.commentId??uuid();
        this.replyTo = params.replyTo;
        this.body = params.body;
        this.createdAt = params.createdAt??new Date();
        this.updatedAt = params.updatedAt??new Date();
    }

    toDTO() : CommentDTO {
        return  {
            userId : this.userId,
            userName : this.userName,
            commentId : this.commentId,
            replyTo : this.replyTo,
            postId : this.postId,
            body : this.body,
            createdAt : this.createdAt,
            updatedAt : this.updatedAt
        }
    }
}