import {CreateThreadUseCase} from "./usecase";
import {userRepository} from "../../../user/repositories";
import {threadRepository} from "../../repositories";

const createThreadUseCase = new CreateThreadUseCase(userRepository,threadRepository);

export {
    createThreadUseCase
}