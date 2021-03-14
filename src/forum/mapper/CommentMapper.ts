import {Comment} from "../domain/Comment";

export class CommentMapper {
    public static toDomain(props : any) : Comment {
        return new Comment({
            commentId: props.comment_id,
            postId: props.post_id,
            replyTo: props.reply_to,
            creatorId: props.creator_id,
            creatorUsername: props.creator_username,
            body: props.body,
            upvoteCount: props.upvote_count,
            downvoteCount: props.downvote_count,
            replyCount: props.reply_count,
            createdAt: props.created_at,
            updatedAt: props.updated_at
        });
    }

    public static toPersistence(props : Comment) : any {
        return {
            comment_id : props.commentId,
            post_id : props.postId,
            reply_to : props.replyTo,
            creator_id : props.creatorId,
            creator_username : props.creatorUsername,
            body : props.body,
            upvote_count : props.upvoteCount,
            downvote_count : props.downvoteCount,
            reply_count : props.replyTo,
            created_at : props.createdAt,
            updated_at : props.updatedAt
        }
    }
}