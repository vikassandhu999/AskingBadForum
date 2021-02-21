import {MongooseCommentRepository} from "./imples/MongooseCommentRepository";
import {MongooseThreadRepository} from "./imples/MongooseThreadRepository";

const commentRepository = new MongooseCommentRepository();
const threadRepository = new MongooseThreadRepository();

export {
    commentRepository ,
    threadRepository
}