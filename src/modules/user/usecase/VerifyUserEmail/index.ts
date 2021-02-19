import {userRepository} from "../../repositories";
import {VerifyUserEmailUseCase} from "./usecase";

const verifyUserEmailUseCase = new VerifyUserEmailUseCase(userRepository);

export {
    verifyUserEmailUseCase
}