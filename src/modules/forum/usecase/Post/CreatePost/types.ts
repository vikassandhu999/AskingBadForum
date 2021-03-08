export type CreatePostDTO = {
    title : string;
    body : string;
}

export class CreatePostResponse {
    status : string = "success";
    data : any;
    constructor(data : any) {
        this.data = data;
    }
}