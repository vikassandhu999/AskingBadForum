import {CreatePostUseCase} from "./usecase";
import {IPostRepository} from "../../../repository/IPostRepository";

const createPostUseCase = new CreatePostUseCase({} as IPostRepository);

export {
    createPostUseCase
}