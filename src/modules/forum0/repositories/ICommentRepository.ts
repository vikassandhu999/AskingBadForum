import {Comment} from "../domain/Comment";

export interface ICommentRepository {
    save(comment : Comment) : Promise<void>;
    exists(commentId : string) : Promise<boolean>;
    getById(commentId : string) : Promise<Comment | null>;
    getReplies(postId : string, replyTo ?: string) : Promise<Comment[]>

    deleteAll() : Promise<void>
}