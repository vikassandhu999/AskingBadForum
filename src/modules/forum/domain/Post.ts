import {v4 as uuid} from "uuid";

export type PostDTO  = {
   userId : string;
   userName : string;
   postId : string;
   title : string;
   body : string;
   createdAt : Date,
    updatedAt : Date
}

export class Post {
    public userId : string;
    public userName : string;
    public postId : string;
    public title : string;
    public body : string;
    public createdAt : Date;
    public updatedAt : Date;
    constructor(params : any) {
        this.userId  = params.userId;
        this.userName = params.userName;
        this.postId = params.postId??uuid();
        this.title = params.title;
        this.body = params.body;
        this.createdAt = params.createdAt??new Date();
        this.updatedAt = params.updatedAt??new Date();
    }

    toDTO() : PostDTO {
        return  {
            userId : this.userId,
            userName : this.userName,
            postId : this.postId,
            title : this.title,
            body : this.body,
            createdAt : this.createdAt,
            updatedAt : this.updatedAt
        }
    }
}