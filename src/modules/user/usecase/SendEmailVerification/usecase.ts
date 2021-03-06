import {Email, IEmailService} from "../../service/IEmailService";
import {SendVerificationEmailDTO, SendVerificationEmailResponse, UserEmailDoesNotExistError} from "./types";
import {IUserRepository} from "../../repositories/IUserRepository";
import validate from "validate.js";
import {BaseError} from "../../../../shared/core/BaseError";
import emailConfig from "../../../../config/emailConfig";
import {User} from "../../domain/User";
import {JWT} from "../../../../shared/packages/jwt";
import { assert } from "../../../../shared/core/Assert";

export class SendVerificationEmailUseCase {
    private readonly emailService : IEmailService;
    private readonly userRepository : IUserRepository;

    constructor(userRepository : IUserRepository ,emailService: IEmailService) {
        this.emailService = emailService;
        this.userRepository = userRepository;
    }

    protected createVerificationEmail(email: string, verificationToken: string) : Email {
        const template=`
            <html lang="en">
                <head>
                <title>Email Verification</title>
                </head>
                <body>
                    <a href="/user/verify-email/${verificationToken}">Verify Email</a>
                </body>
            </html>
        `;

        return {
            to : email,
            from : emailConfig.senderEmail,
            subject : "Email Verification",
            body : template
        }
    }

    public async run(params: SendVerificationEmailDTO, context: any): Promise<SendVerificationEmailResponse> {
        await this.validateInput(params);

        const userEmail = params.email;

        const user : User | null = await this.userRepository.getByEmail(userEmail);

        assert(!!user , new UserEmailDoesNotExistError());

        const verificationToken = JWT.createToken({
            // @ts-ignore
            userId : user.userId,
        } , emailConfig.emailVerificationTokenSecret , emailConfig.emailVerificationExpiryTime);

        let verificationEmail = this.createVerificationEmail(userEmail, verificationToken);

        await this.emailService.sendEmail(verificationEmail);

        return new SendVerificationEmailResponse();
    }

    private async validateInput(params: SendVerificationEmailDTO): Promise<void> {
        const validation = validate(params, this.inputConstraints);
        if (!validation) {
            return;
        }
        throw new BaseError(validation, 400);
    }

    private inputConstraints = {
        email: {
            presence: true,
            email: true
        }
    }
}