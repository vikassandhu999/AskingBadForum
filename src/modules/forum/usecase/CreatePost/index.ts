import {CreatePostUseCase} from "./usecase";
import {userRepository} from "../../../user/repositories";
import {postRepository} from "../../repositories";

const createPostUseCase = new CreatePostUseCase(userRepository,postRepository);

export {
    createPostUseCase
}