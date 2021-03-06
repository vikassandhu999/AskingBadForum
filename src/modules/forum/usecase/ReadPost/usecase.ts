import {IUserRepository} from "../../../user/repositories/IUserRepository";
import validate from "validate.js";
import { ReadThreadResponse, ReadPostDTO} from "./types";
import {UserContext} from "../../../user/domain/UserContext";
import {AssertContext} from "../../../../shared/core/AssertContext";
import {BaseError} from "../../../../shared/core/BaseError";
import {ICommentRepository} from "../../repositories/ICommentRepository";
import { IPostRepository } from "../../repositories/IPostRepository";
import { PostDoesNotExistError } from "../CreateComment/types";
import { assert } from "../../../../shared/core/Assert";
import { Post } from "../../domain/Post";


export class ReadPostUseCase {
    private readonly userRepository: IUserRepository;
    private readonly postRepository: IPostRepository;
    private readonly commentRepository: ICommentRepository;

    constructor(
        userRepository: IUserRepository,
        postRepository: IPostRepository,
        commentRepository : ICommentRepository
    ) {
        this.userRepository = userRepository;
        this.postRepository = postRepository;
        this.commentRepository = commentRepository;
    }

    public async run(params: ReadPostDTO, context: UserContext): Promise<any> {
        AssertContext(context, {isAuthenticated: true});
        await this.validateInput(params);

        const postId = params.postId;
        const replyTo = params.replyTo;

        const [post , comment , replies] = await Promise.all([
            this.postRepository.getById(postId),
            replyTo?this.commentRepository.getById(replyTo) : null ,
            this.commentRepository.getReplies(postId , replyTo)
        ]);

        assert(!!post , new PostDoesNotExistError());

        return new ReadThreadResponse(post as Post, comment , replies);
    }

    private async validateInput(params: ReadPostDTO): Promise<void> {
        const validation = validate(params, this.inputConstraints);
        if (!validation) {
            return;
        }
        throw new BaseError(validation, 400);
    }

    private inputConstraints = {
        postId : {
            presence: true
        }
    }
}