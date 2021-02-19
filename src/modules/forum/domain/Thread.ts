import {v4 as uuid} from "uuid";

export type ThreadDTO  = {
   userId : string;
   userName : string;
   threadId : string;
   title : string;
   body : string;
   createdAt : Date,
    updatedAt : Date
}

export class Thread {
    public userId : string;
    public userName : string;
    public threadId : string;
    public title : string;
    public body : string;
    public createdAt : Date;
    public updatedAt : Date;
    constructor(params : any) {
        this.userId  = params.userId;
        this.userName = params.userName;
        this.threadId = params.threadId??uuid();
        this.title = params.title;
        this.body = params.body;
        this.createdAt = params.createdAt??new Date();
        this.updatedAt = params.updatedAt??new Date();
    }

    toDTO() : ThreadDTO {
        return  {
            userId : this.userId,
            userName : this.userName,
            threadId : this.threadId,
            title : this.title,
            body : this.body,
            createdAt : this.createdAt,
            updatedAt : this.updatedAt
        }
    }
}