import { Post } from "../domain/Post";

export interface IPostRepository {
    save(post : Post) : Promise<void>
    exists(postId : string) : Promise<boolean>
    getById(postId : string) : Promise<Post | null>

    deleteAll() : Promise<void>
}