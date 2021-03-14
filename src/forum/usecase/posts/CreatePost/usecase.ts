
import {UseCase} from "../../../../shared/core/Usecase";
import {CreatePostDTO, CreatePostResponse} from "./types";
import {IPostRepository} from "../../../repository/IPostRepository";
import {AssertContext} from "../../../../shared/core/AssertContext";
import {UserContext} from "../../../../user/domain/UserContext";
import {Post} from "../../../domain/Post";
import {IPostContent} from "../../../domain/PostContent";
import {Utils} from "../../../../shared/core/Utils";

export class CreatePostUseCase extends UseCase<CreatePostDTO, CreatePostResponse> {
    private readonly postRepository : IPostRepository
    constructor(postRepository : IPostRepository) {
        super();
        this.postRepository = postRepository;
    }

    protected async runImpl(params: CreatePostDTO, context: UserContext): Promise<CreatePostResponse> {
        AssertContext(context , {isAuthenticated : true});

        const {title , body, postContent,tags} = params;

        const postSlug = Utils.slugify(title);

        const post = new Post({
            title : title,
            body : body,
            postContent : postContent as IPostContent,
            creatorId: context.userId,
            creatorUsername : context.userName,
            slug : postSlug,
            tags: tags
        });

        await this.postRepository.save(post);

        return new CreatePostResponse();
    }
   /*
    title : string;
    body : string;
    postContent ?: {
        type : string;
        url : string;
    },
    tags : Array<string>

    */
    protected inputConstraints: any = {
        title : {
            allowEmpty : false,
            presence : true,
            length : {
                minimum : 6,
                maximum : 100
            }
        },
        body : {
            allowEmpty: false,
            presence: true,
            length : {
                minimum : 4,
                maximum : 500
            }
        },
        tags : {
            presence : true,
        }
    }
}