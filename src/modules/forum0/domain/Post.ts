import {v4 as uuid} from "uuid";

export type PostDTO = {
    creatorId: string;
    creatorUsername: string;
    postId: string;
    title: string;
    body: string;
    createdAt: Date,
    updatedAt: Date
    upvotes: number;
}

export class Post {
    public creatorId: string;
    public creatorUsername: string;
    public postId: string;
    public title: string;
    public body: string;
    public createdAt: Date;
    public updatedAt: Date;
    public upvotes: number;

    constructor(params: any) {
        this.creatorId = params.creatorId;
        this.creatorUsername = params.creatorUsername;
        this.postId = params.postId ?? uuid();
        this.title = params.title;
        this.body = params.body;
        this.createdAt = params.createdAt ?? new Date();
        this.updatedAt = params.updatedAt ?? new Date();
        this.upvotes = params.upvotes ?? 0;
    }

    toDTO(): PostDTO {
        return {
            creatorId: this.creatorId,
            creatorUsername: this.creatorUsername,
            postId: this.postId,
            title: this.title,
            body: this.body,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
            upvotes: this.upvotes
        }
    }
}