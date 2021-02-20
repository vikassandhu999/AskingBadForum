import {IUserRepository} from "../../repositories/IUserRepository";
import {InvalidVerificationTokenError, VerifyUserEmailDTO, VerifyUserEmailResponse} from "./types";
import {BaseError} from "../../../../shared/core/BaseError";
import validate from "validate.js";
import {JWT} from "../../../../shared/packages/jwt";
import emailConfig from "../../../../config/emailConfig";

export class VerifyUserEmailUseCase {
    private readonly userRepository : IUserRepository;

    constructor(userRepository : IUserRepository) {
        this.userRepository = userRepository;
    }

    public async run(params: VerifyUserEmailDTO , context: any): Promise<VerifyUserEmailResponse> {
        await this.validateInput(params);
        const { verificationToken } = params;

        const decoded = await JWT.verify(verificationToken , emailConfig.emailVerificationTokenSecret);

        if(!decoded) throw new InvalidVerificationTokenError();

        await this.userRepository.setIsEmailVerified(decoded.userId , true);

        return new VerifyUserEmailResponse();
    }

    private async validateInput(params: VerifyUserEmailDTO): Promise<void> {
        const validation = validate(params, this.inputConstraints);
        if (!validation) {
            return;
        }
        throw new BaseError(validation, 400);
    }

    private inputConstraints = {
        verificationToken: {
            presence: true
        }
    }
}