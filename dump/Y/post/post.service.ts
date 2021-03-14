import React from "react";
import Result from "../../../client/src/shared/core/Result";

export type CreatePostProps = {
    title : string;
    body : string;
}


class PostService {
    async create(data : CreatePostProps) : Promise<Result<{},{}>> {
        console.log(data);
        return Result.success({});
        throw "Unimplemented Error";
    }
}

const postService = new PostService();


export default postService;