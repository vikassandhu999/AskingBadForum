import {Post} from "../domain/Post";

export interface IPostRepository {
    getById(postId : string) : Promise<Post>;
    save(post : Post) : Promise<void>
}