export enum POST_CONTENT_TYPE {
    IMAGE = "image",
    VIDEO = "video"
}


export interface IPostContent {
  type : POST_CONTENT_TYPE;
  url : string;
}

export class PostContent {
    state : IPostContent;
    constructor(props : IPostContent) {
        this.state = props;
    }

    get type() : POST_CONTENT_TYPE {
        return this.state.type;
    }

    get url() : string {
        return this.state.url;
    }

}