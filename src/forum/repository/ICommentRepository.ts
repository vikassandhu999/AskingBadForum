import {Comment} from "../domain/Comment";

export interface ICommentRepository {
    getById(commentId : string) : Promise<Comment>
}