export type CreatePostDTO = {
    title : string;
    body : string;
    postContent ?: {
        type : string;
        url : string;
    },
    tags : Array<string>
}

export class CreatePostResponse {

}