import {GetUserProfileUseCase} from "./usecase";
import {userRepository} from "../../repositories";

const getUserProfileUseCase = new GetUserProfileUseCase(userRepository);

export {
    getUserProfileUseCase
}