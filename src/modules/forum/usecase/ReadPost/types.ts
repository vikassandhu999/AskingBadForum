import {Comment} from "../../domain/Comment";
import { Post } from "../../domain/Post";

export type ReadPostDTO = {
    postId : string;
    replyTo ?: string;
    pageNumber ?: number;
    limit ?: number;
}

export class ReadThreadResponse {
    status : string = "success";
    data : object;
    constructor(post : Post , comment : Comment | null , replies : Comment[]) {
        this.data = {
            post ,
            comment ,
            replies
        }
    }
}