import {Comment} from "../domain/Comment";

export class CommentMapper {
    public static toDomain(raw : any) : Comment {
        return new Comment({
            userId : raw.user_id,
            commentId : raw.comment_id,
            userName : raw.user_name,
            threadId : raw.thread_id,
            replyTo : raw.reply_to,
            body : raw.body,
            createdAt : raw.created_at,
            updatedAt : raw.updated_at,
        });
    }

    public static toPersistence(comment : Comment) : any {
        return {
            user_id : comment.userId,
            user_name : comment.userName,
            comment_id : comment.commentId,
            reply_to : comment.replyTo,
            thread_id : comment.threadId,
            body : comment.body,
            created_at : comment.createdAt,
            updated_at : comment.updatedAt
        }
    }
}