import {LoginUserUseCase} from "./usecase";
import {userRepository} from "../../repositories";

const loginUserUseCase = new LoginUserUseCase(userRepository);

export {
    loginUserUseCase
}