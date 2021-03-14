import {SendVerificationEmailUseCase} from "./usecase";
import {userRepository} from "../../repositories";
import {emailService} from "../../service";

const sendEmailVerificationUseCase = new SendVerificationEmailUseCase(userRepository,emailService);

export {
    sendEmailVerificationUseCase
}