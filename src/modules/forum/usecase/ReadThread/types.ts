import {Thread} from "../../domain/Thread";
import {Comment} from "../../domain/Comment";

export type ReadThreadDTO = {
    threadId : string;
    replyTo ?: string;
    pageNumber ?: number;
    limit ?: number;
}

export class ReadThreadResponse {
    status : string = "success";
    data : object;
    constructor(thread : Thread , comment : Comment | null , replies : Comment[]) {
        this.data = {
            thread ,
            comment ,
            replies
        }
    }
}