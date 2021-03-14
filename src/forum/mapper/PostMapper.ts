// @ts-ignore
import {Post} from "../domain/Post";
import {PostContent} from "../domain/PostContent";

export class PostMapper {

    public static toDomain(props : any) : Post {
        return new Post({
            postId : props.post_id,
            creatorId : props.creator_id,
            creatorUsername : props.creator_username,
            title : props.title,
            slug : props.slug,
            body : props.body,
            postContent : new PostContent({
                type : props.post_content_type ,
                url : props.post_content_url
            }),
            upvoteCount : props.upvote_count,
            downvoteCount : props.downvote_count,
            replyCount : props.reply_count,
            tags : props.tags,
            createdAt : props.created_at,
            updatedAt : props.updated_at
        });
    }

    public static toPersistence(props : Post) : any {
        return {
            post_id : props.postId,
            creator_id : props.creatorId,
            creator_username : props.creatorUsername,
            title : props.title,
            slug : props.slug,
            body : props.body,
            post_content_type : props.postContent.type,
            post_content_url : props.postContent.url,
            upvote_count : props.upvoteCount,
            downvote_count : props.downvoteCount,
            reply_count : props.replyCount,
            tags : props.tags,
            created_at : props.createdAt,
            updated_at : props.updatedAt
        }
    }

}