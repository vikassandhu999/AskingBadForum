import {PostDTO} from "../../../domain/Post";

export type GetPostByIdDTO = {
    postId : string;
}

export class GetPostByIdResponse {
    status : string = "success";
    data : any;
    constructor(data : PostDTO) {
        this.data = data;
    }
}