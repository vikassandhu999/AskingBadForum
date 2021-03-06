import {ICommentRepository} from "../ICommentRepository";
import {CommentModel} from "../../infra/database/mongoose/models/CommentModel";
import {Comment} from "../../domain/Comment";
import {CommentMapper} from "../../mapper/CommentMapper";

export class MongooseCommentRepository implements ICommentRepository {
    private readonly model = CommentModel;

    async exists(commentId: string): Promise<boolean> {
        const exists = await this.model.exists({comment_id : commentId});
        return !!exists;
    }

    async getById(commentId: string): Promise<Comment | null> {
        const comment = await this.model.findOne({comment_id : commentId});
        if(!comment) return null;
        return CommentMapper.toDomain(comment);
    }

    async getReplies(postId: string, replyTo?: string): Promise<Comment[]> {
        const replies = await this.model.find({post_id : postId , reply_to : replyTo});
        if(!replies) return [];
        return replies.map((reply) => CommentMapper.toDomain(reply));
    }

    async save(comment: Comment): Promise<void> {
        const commentDoc = CommentMapper.toPersistence(comment);
        const newComment = new this.model(commentDoc);
        await newComment.save();
    }


    async deleteAll() : Promise<void> {
        await this.model.deleteMany();
    }
}