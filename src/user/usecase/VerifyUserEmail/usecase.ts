import {IUserRepository} from "../../repositories/IUserRepository";
import {InvalidVerificationTokenError, VerifyUserEmailDTO, VerifyUserEmailResponse} from "./types";
import {JWT} from "../../../shared/packages/jwt";
import emailConfig from "../../../config/emailConfig";
import { assert } from "../../../shared/core/Assert";
import {UseCase} from "../../../shared/core/Usecase";

export class VerifyUserEmailUseCase extends UseCase<VerifyUserEmailDTO, VerifyUserEmailResponse>{
    private readonly userRepository : IUserRepository;

    constructor(userRepository : IUserRepository) {
        super();
        this.userRepository = userRepository;
    }

    protected async runImpl(params: VerifyUserEmailDTO , context: any): Promise<VerifyUserEmailResponse> {
        const { verificationToken } = params;

        const decoded = await JWT.verify(verificationToken , emailConfig.emailVerificationTokenSecret);

        assert(!!decoded , new InvalidVerificationTokenError());

        await this.userRepository.setIsEmailVerified(decoded.userId , true);

        return new VerifyUserEmailResponse();
    }

    protected inputConstraints = {
        verificationToken: {
            presence: true
        }
    }
}