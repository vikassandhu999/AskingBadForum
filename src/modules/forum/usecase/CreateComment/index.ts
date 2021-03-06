import {CreateCommentUseCase} from "./usecase";
import {userRepository} from "../../../user/repositories";
import {commentRepository, postRepository} from "../../repositories";

const createCommentUseCase = new CreateCommentUseCase(userRepository,postRepository,commentRepository);

export {
    createCommentUseCase
}