import {v4 as uuid} from "uuid";
import {IPostContent, PostContent} from "./PostContent";

export interface IPost {
    postId: string;
    creatorId: string;
    creatorUsername: string;
    title: string;
    slug: string;
    body: string;
    postContent?: IPostContent;
    upvoteCount : number;
    downvoteCount : number;
    replyCount : number;
    createdAt: Date;
    updatedAt: Date;
    tags : Array<string>
}

interface PostProps {
    postId?: string;
    creatorId: string;
    creatorUsername: string;
    title: string;
    slug: string;
    body: string;
    upvoteCount ?: number,
    downvoteCount ?: number,
    replyCount ?: number,
    postContent?: IPostContent;
    createdAt?: Date;
    updatedAt?: Date;
    tags : Array<string>
}

export class Post {
    state: IPost;

    constructor(props: PostProps) {
        let postContent : PostContent | undefined;
        if(props.postContent) {
            postContent = new PostContent({type : props.postContent.type , url : props.postContent.url});
        }
        this.state = {
            ...props,
            postId: props.postId ?? uuid(),
            createdAt: props.createdAt ?? new Date(),
            updatedAt: props.updatedAt ?? new Date(),
            postContent : postContent,
            upvoteCount : props.upvoteCount??0,
            downvoteCount : props.downvoteCount??0,
            replyCount : props.replyCount??0,
        };
    }

    get postId(): string {
        return this.state.postId;
    }

    get creatorId(): string {
        return this.state.creatorId;
    }

    get creatorUsername(): string {
        return this.state.creatorUsername;
    }

    get title(): string {
        return this.state.title;
    }

    get slug(): string {
        return this.state.slug;
    }

    get body(): string {
        return this.state.body;
    }

    get postContent(): PostContent {
        return <PostContent>this.state.postContent;
    }

    get createdAt(): Date {
        return this.state.createdAt;
    }

    get updatedAt(): Date {
        return this.state.updatedAt;
    }

    get upvoteCount() : number {
        return this.state.upvoteCount;
    }

    get downvoteCount() : number {
        return this.state.downvoteCount;
    }

    get replyCount() : number {
        return this.state.replyCount;
    }

    get tags() : Array<string> {
        return this.state.tags;
    }

    public toDTO() : IPost {
        return this.state;
    }

}