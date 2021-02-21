import validate from "validate.js";
import {BaseError} from "../../../../shared/core/BaseError";
import {CreateThreadDTO, CreateThreadResponse, UserNameDoesNotExistError} from "./types";
import {Utils} from "../../../../shared/core/Utils";
import {UserContext} from "../../../user/domain/UserContext";
import {AssertContext} from "../../../../shared/core/AssertContext";
import {IUserRepository} from "../../../user/repositories/IUserRepository";
import {IThreadRepository} from "../../repositories/IThreadRepository";
import {Thread} from "../../domain/Thread";

export class CreateThreadUseCase {
    private readonly userRepository : IUserRepository;
    private readonly threadRepository : IThreadRepository;
    constructor(userRepository : IUserRepository, threadRepository : IThreadRepository) {
        this.userRepository = userRepository;
        this.threadRepository = threadRepository;
    }

    public async run(params: CreateThreadDTO , context: UserContext): Promise<any> {
        AssertContext(context , {isAuthenticated : true});

        await this.validateInput(params);

        const body = Utils.encodeHTML(params.body);
        const title = Utils.encodeHTML(params.title);

        const userExists = await this.userRepository.usernameExists(context.userName);

        if(!userExists) throw new UserNameDoesNotExistError();

        const thread = new Thread({userId : context.userId , userName : context.userName , title,body});

        await this.threadRepository.save(thread);

        return new CreateThreadResponse(thread.toDTO());

    }

    private async validateInput(params: CreateThreadDTO): Promise<void> {
        const validation = validate(params, this.inputConstraints);
        if (!validation) {
            return;
        }
        throw new BaseError(validation, 400);
    }

    private inputConstraints = {
        title : {
            presence : true ,
            min : 20 ,
            max : 150
        },
        body : {
            presence : true ,
            min : 6 ,
            max : 500
        }
    }
}