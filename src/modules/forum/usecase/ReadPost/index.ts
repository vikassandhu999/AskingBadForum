import { ReadPostUseCase } from "./usecase";
import { userRepository } from "../../../user/repositories";
import { postRepository, commentRepository } from "../../repositories";

const readPostUseCase = new ReadPostUseCase(userRepository , postRepository, commentRepository);

export {
    readPostUseCase
}