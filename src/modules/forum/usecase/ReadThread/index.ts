import { ReadThreadUseCase } from "./usecase";
import { userRepository } from "../../../user/repositories";
import { threadRepository, commentRepository } from "../../repositories";

const readThreadUseCase = new ReadThreadUseCase(userRepository , threadRepository, commentRepository);

export {
    readThreadUseCase
}