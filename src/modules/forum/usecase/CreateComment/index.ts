import {CreateCommentUseCase} from "./usecase";
import {userRepository} from "../../../user/repositories";
import {commentRepository, threadRepository} from "../../repositories";

const createCommentUseCase = new CreateCommentUseCase(userRepository,threadRepository,commentRepository);


export {
    createCommentUseCase
}