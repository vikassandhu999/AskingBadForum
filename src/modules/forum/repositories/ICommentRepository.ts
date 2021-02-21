import {Comment} from "../domain/Comment";

export interface ICommentRepository {
    save(comment : Comment) : Promise<void>;
    exists(commentId : string) : Promise<boolean>;
    getById(commentId : string) : Promise<Comment | null>;
    getReplies(threadId : string, replyTo ?: string) : Promise<Comment[]>
}