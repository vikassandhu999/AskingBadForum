import {IUserRepository} from "../../../user/repositories/IUserRepository";
import {IThreadRepository} from "../../repositories/IThreadRepository";
import validate from "validate.js";
import {ReadThreadDTO, ReadThreadResponse} from "./types";
import {UserContext} from "../../../user/domain/UserContext";
import {AssertContext} from "../../../../shared/core/AssertContext";
import {BaseError} from "../../../../shared/core/BaseError";
import {ICommentRepository} from "../../repositories/ICommentRepository";
import {ThreadIdDoesNotExistError} from "../CreateThread/types";

export class ReadThreadUseCase {
    private readonly userRepository: IUserRepository;
    private readonly threadRepository: IThreadRepository;
    private readonly commentRepository: ICommentRepository;

    constructor(
        userRepository: IUserRepository,
        threadRepository: IThreadRepository,
        commentRepository : ICommentRepository
    ) {
        this.userRepository = userRepository;
        this.threadRepository = threadRepository;
        this.commentRepository = commentRepository;
    }

    public async run(params: ReadThreadDTO, context: UserContext): Promise<any> {
        AssertContext(context, {isAuthenticated: true});
        await this.validateInput(params);

        const threadId = params.threadId;
        const replyTo = params.replyTo;

        const [thread , comment , replies] = await Promise.all([
            this.threadRepository.getById(threadId),
            replyTo?this.commentRepository.getById(replyTo) : null ,
            this.commentRepository.getReplies(threadId , replyTo)
        ]);

        if(!thread) throw new ThreadIdDoesNotExistError();

        return new ReadThreadResponse(thread , comment , replies);

    }

    private async validateInput(params: ReadThreadDTO): Promise<void> {
        const validation = validate(params, this.inputConstraints);
        if (!validation) {
            return;
        }
        throw new BaseError(validation, 400);
    }

    private inputConstraints = {
        threadId : {
            presence: true
        },
    }
}