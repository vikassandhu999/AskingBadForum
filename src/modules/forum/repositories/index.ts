import {MongooseCommentRepository} from "./imples/MongooseCommentRepository";
import { MongoosePostRepository } from "./imples/MongoosePostRepository";

const commentRepository = new MongooseCommentRepository();
const postRepository = new MongoosePostRepository();

export {
    commentRepository ,
    postRepository
}