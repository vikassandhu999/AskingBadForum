import {v4 as uuid} from "uuid";

export type LikeDTO  = {
    userId : string;
    userName : string;
    topicId : string;
    createdAt : Date;
    updatedAt : Date;
}

export class Like {
    public userId : string;
    public userName : string;
    public topicId : string;
    public createdAt : Date;
    public updatedAt : Date;
    constructor(params : any) {
        this.userId = params.userId;
        this.userName = params.userName;
        this.topicId = params.topicId;
        this.createdAt = params.createdAt??new Date();
        this.updatedAt = params.updatedAt??new Date();
    }

    toDTO() : LikeDTO {
        return  {
            userId : this.userId,
            userName : this.userName,
            topicId : this.topicId,
            createdAt : this.createdAt,
            updatedAt : this.updatedAt
        }
    }
}