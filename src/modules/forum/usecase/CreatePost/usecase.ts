import validate from "validate.js";
import {BaseError} from "../../../../shared/core/BaseError";
import {Utils} from "../../../../shared/core/Utils";
import {UserContext} from "../../../user/domain/UserContext";
import {AssertContext} from "../../../../shared/core/AssertContext";
import {IUserRepository} from "../../../user/repositories/IUserRepository";
import { assert } from "../../../../shared/core/Assert";
import { IPostRepository } from "../../repositories/IPostRepository";
import { CreatePostDTO, UserNameDoesNotExistError, CreatePostResponse } from "./types";
import { Post } from "../../domain/Post";

export class CreatePostUseCase {
    private readonly userRepository : IUserRepository;
    private readonly postRepository : IPostRepository;
    constructor(userRepository : IUserRepository, postRepository : IPostRepository) {
        this.userRepository = userRepository;
        this.postRepository = postRepository;
    }

    public async run(params: CreatePostDTO , context: UserContext): Promise<any> {
        AssertContext(context , {isAuthenticated : true});

        await this.validateInput(params);

        const body = Utils.encodeHTML(params.body);
        const title = Utils.encodeHTML(params.title);

        const usernameExists = await this.userRepository.usernameExists(context.userName);

        assert(usernameExists, new UserNameDoesNotExistError());

        const post = new Post({userId : context.userId , userName : context.userName , title,body});

        await this.postRepository.save(post);

        return new CreatePostResponse(post.toDTO());
    }

    private async validateInput(params: CreatePostDTO): Promise<void> {
        const validation = validate(params, this.inputConstraints);
        if (!validation) {
            return;
        }
        throw new BaseError(validation, 400);
    }

    private inputConstraints = {
        title : {
            presence : true ,
            length: {
                minimum: 20,
                maximum: 150
            }
        },
        body : {
            presence : true ,
            length: {
                minimum: 6,
                maximum: 500
            }
        }
    }
}