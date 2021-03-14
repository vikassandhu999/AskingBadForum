//soch matt, bas krde

import {v4 as uuid} from "uuid";

export interface IComment {
    commentId : string;
    postId : string;
    replyTo : string;
    creatorId : string;
    creatorUsername : string;
    body : string;
    upvoteCount : number;
    downvoteCount : number;
    replyCount : number;
    createdAt: Date;
    updatedAt: Date;
}

interface CommentProps {
    commentId ?: string;
    postId : string;
    replyTo : string;
    creatorId : string;
    creatorUsername : string;
    body : string;
    upvoteCount ?: number;
    downvoteCount ?: number;
    replyCount ?: number;
    createdAt ?: Date;
    updatedAt ?: Date;
}

export class Comment {
    state : IComment;
    constructor(props : CommentProps) {
        this.state = {
            ...props,
            commentId: props.commentId ?? uuid(),
            createdAt: props.createdAt ?? new Date(),
            updatedAt: props.updatedAt ?? new Date(),
            upvoteCount : props.upvoteCount??0,
            downvoteCount : props.downvoteCount??0,
            replyCount : props.replyCount??0,
        }
    }

    get commentId() : string {
        return this.state.commentId;
    }

    get postId() : string {
        return this.state.postId;
    }

    get replyTo() : string {
        return this.state.replyTo;
    }

    get creatorId() : string {
        return this.state.creatorId;
    }

    get creatorUsername() : string {
        return this.state.creatorUsername;
    }

    get body() : string {
        return this.state.body;
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

    get createdAt() : Date {
        return this.state.createdAt;
    }

    get updatedAt() : Date {
        return this.state.updatedAt;
    }
}