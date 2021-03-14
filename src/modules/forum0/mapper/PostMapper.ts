import { Post } from "../domain/Post";

export class PostMapper {
    public static toDomain(raw : any) : Post {
        return new Post({
            userId : raw.user_id,
            userName : raw.user_name,
            postId : raw.post_id,
            title : raw.title,
            body : raw.body,
            createdAt : raw.created_at,
            updatedAt : raw.updated_at,
        });
    }

    public static toPersistence(thread : Post) : any {
        return {
            user_id : thread.userId,
            user_name : thread.userName,
            post_id : thread.postId,
            title : thread.title,
            body : thread.body,
            created_at : thread.createdAt,
            updated_at : thread.updatedAt
        }
    }
}