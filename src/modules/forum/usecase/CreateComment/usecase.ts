import validate from "validate.js";
import {BaseError} from "../../../../shared/core/BaseError";
import {IUserRepository} from "../../../user/repositories/IUserRepository";
import {IThreadRepository} from "../../repositories/IThreadRepository";
import {ICommentRepository} from "../../repositories/ICommentRepository";
import {CommentIdDoesNotExistError, CreateCommentDTO, CreateCommentResponse} from "./types";
import {UserContext} from "../../../user/domain/UserContext";
import {AssertContext} from "../../../../shared/core/AssertContext";
import {ThreadIdDoesNotExistError, UserNameDoesNotExistError} from "../CreateThread/types";
import {Utils} from "../../../../shared/core/Utils";
import {Comment} from "../../domain/Comment";

export class CreateCommentUseCase {
    private readonly userRepository: IUserRepository;
    private readonly threadRepository: IThreadRepository;
    private readonly commentRepository: ICommentRepository;

    constructor(
        userRepository: IUserRepository,
        threadRepository: IThreadRepository,
        commentRepository: ICommentRepository,
    ) {
        this.userRepository = userRepository;
        this.commentRepository = commentRepository;
        this.threadRepository = threadRepository;
    }

    public async run(params: CreateCommentDTO, context: UserContext): Promise<any> {
        AssertContext(context , {isAuthenticated : true});

        await this.validateInput(params);

        const threadId = params.threadId;
        const body = Utils.encodeHTML(params.body);
        const replyTo = params.replyTo;

        const [usernameExists , threadIdExists, commentIdExists] = await Promise.all([
           this.userRepository.usernameExists(context.userName) ,
           this.threadRepository.exists(threadId) ,
            replyTo?this.commentRepository.exists(replyTo) : true
        ]);

        if(!usernameExists) throw new UserNameDoesNotExistError();
        if(!threadIdExists) throw new ThreadIdDoesNotExistError();
        if(!!replyTo && !commentIdExists) throw new CommentIdDoesNotExistError();

        const comment = new Comment({userId : context.userId , userName : context.userName ,replyTo,body});

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
        threadId: {
            presence: true,
        },
        replyTo: {
            min: 6,
        },
        body: {
            presence: true,
            min: 6,
            max: 500
        }
    }
}