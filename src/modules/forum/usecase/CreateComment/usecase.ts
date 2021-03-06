import validate from "validate.js";
import {BaseError} from "../../../../shared/core/BaseError";
import {IUserRepository} from "../../../user/repositories/IUserRepository";
import {ICommentRepository} from "../../repositories/ICommentRepository";
import {CreateCommentDTO, CreateCommentResponse, PostDoesNotExistError, CommentDoesNotExistError} from "./types";
import {UserContext} from "../../../user/domain/UserContext";
import {AssertContext} from "../../../../shared/core/AssertContext";
import {Utils} from "../../../../shared/core/Utils";
import {Comment} from "../../domain/Comment";
import { IPostRepository } from "../../repositories/IPostRepository";
import { UserNameDoesNotExistError } from "../CreatePost/types";
import { assert } from "../../../../shared/core/Assert";

export class CreateCommentUseCase {
    private readonly userRepository: IUserRepository;
    private readonly postRepository: IPostRepository;
    private readonly commentRepository: ICommentRepository;

    constructor(
        userRepository: IUserRepository,
        postRepository: IPostRepository,
        commentRepository: ICommentRepository,
    ) {
        this.userRepository = userRepository;
        this.commentRepository = commentRepository;
        this.postRepository = postRepository;
    }

    public async run(params: CreateCommentDTO, context: UserContext): Promise<any> {
        AssertContext(context , {isAuthenticated : true});

        await this.validateInput(params);

        const postId = params.postId;
        const body = Utils.encodeHTML(params.body);
        const replyTo = params.replyTo;

        // const [usernameExists , postIdExists, commentIdExists] = await Promise.all([
        //    this.userRepository.usernameExists(context.userName) ,
        //    this.postRepository.exists(postId) ,
        //     replyTo?this.commentRepository.exists(replyTo as string) : true
        // ]);

        const usernameExists = await this.userRepository.usernameExists(context.userName);
        const postIdExists = await this.postRepository.exists(postId);
        const commentIdExists = replyTo?await this.commentRepository.exists(replyTo as string) : true;

        assert(usernameExists, new UserNameDoesNotExistError());
        assert(postIdExists, new PostDoesNotExistError());
        assert((!replyTo && !commentIdExists), new CommentDoesNotExistError());

        const comment = new Comment({userId : context.userId , userName : context.userName,postId ,replyTo,body});

        await this.commentRepository.save(comment);

        return new CreateCommentResponse(comment.toDTO());
    }

    private async validateInput(params: CreateCommentDTO): Promise<void> {
        const validation = validate(params, this.inputConstraints);
        if (!validation) {
            return;
        }
        throw new BaseError(validation, 400);
    }

    private inputConstraints = {
        postId: {
            presence: true,
        },
        body: {
            presence: true,
            length: {
                minimum: 6,
                maximum: 500
            }
        }
    }
}