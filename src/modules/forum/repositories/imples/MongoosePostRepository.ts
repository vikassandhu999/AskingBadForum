import { IPostRepository } from "../IPostRepository";
import { PostModel } from "../../infra/database/mongoose/models/PostModel";
import { Post } from "../../domain/Post";
import { PostMapper } from "../../mapper/PostMapper";

export class MongoosePostRepository implements IPostRepository {
    private readonly model = PostModel;

    async exists(postId: string): Promise<boolean> {
        const exists = await this.model.exists({post_id : postId});
        return !!exists;
    }

    async getById(postId: string): Promise<Post | null> {
        const post = await this.model.findOne({post_id : postId});
        if(!post) return null;
        return PostMapper.toDomain(post);
    }

    async save(post: Post): Promise<void> {
        const newPost = new this.model(PostMapper.toPersistence(post));
        await newPost.save();
    }

    async deleteAll() : Promise<void> {
        await this.model.deleteMany();
    }
}