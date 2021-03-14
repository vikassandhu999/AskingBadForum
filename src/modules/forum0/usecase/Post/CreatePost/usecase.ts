import {IPostRepository} from "../../../repositories/IPostRepository";
import {IUserRepository} from "../../../../../user/repositories/IUserRepository";
import {CreatePostDTO, CreatePostResponse} from "./types";
import validate from "validate.js";
import {InvalidParamsError} from "../../../../../shared/core/InvalidParamsError";
import {UserContext} from "../../../../../user/domain/UserContext";
import {AssertContext} from "../../../../../shared/core/AssertContext";
import { assert } from "../../../../../shared/core/Assert";
import {UsernameDoesNotExistError} from "../../User/types";
import {Post} from "../../../domain/Post";

export class CreatePostUseCase {
    postRepository : IPostRepository;
    userRepository : IUserRepository;
    constructor(postRepository : IPostRepository , userRepository : IUserRepository) {
        this.postRepository = postRepository;
        this.userRepository = userRepository;
    }

    public async run(params : CreatePostDTO, context : UserContext) : Promise<CreatePostResponse> {
        AssertContext(context , {isAuthenticated : true});

        await this.validateInput(params);

        const userExists = await this.userRepository.usernameExists(context.userName);

        assert(userExists , new UsernameDoesNotExistError());

        const post = new Post({

        });


        return new CreatePostResponse({});
    }


    private async validateInput(params: CreatePostDTO): Promise<void> {
        const validation = validate(params, this.inputConstraints);
        if (!validation) {
            return;
        }
        throw new InvalidParamsError(validation);
    }

    private inputConstraints = {
        title: {
            presence: true,
            minimum: 10,
            maximum: 100
        },
        body: {
            presence: true,
            length: {
                minimum: 20,
                maximum: 500
            }
        }
    }
}