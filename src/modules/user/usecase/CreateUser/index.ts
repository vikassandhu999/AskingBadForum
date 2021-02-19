import {userRepository} from "../../repositories";
import {sendEmailVerificationUseCase} from "../SendEmailVerification";
import {CreateUserUseCase} from "./usecase";

const createUserUseCase = new CreateUserUseCase(userRepository,sendEmailVerificationUseCase);

export {
    createUserUseCase
}