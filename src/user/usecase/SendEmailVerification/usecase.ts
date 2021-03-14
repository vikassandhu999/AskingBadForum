import {Email, IEmailService} from "../../service/IEmailService";
import {SendVerificationEmailDTO, SendVerificationEmailResponse, UserEmailDoesNotExistError} from "./types";
import {IUserRepository} from "../../repositories/IUserRepository";
import emailConfig from "../../../config/emailConfig";
import {User} from "../../domain/User";
import {JWT} from "../../../shared/packages/jwt";
import { assert } from "../../../shared/core/Assert";
import {UseCase} from "../../../shared/core/Usecase";

export class SendVerificationEmailUseCase extends UseCase<SendVerificationEmailDTO , SendVerificationEmailResponse>{
    private readonly emailService : IEmailService;
    private readonly userRepository : IUserRepository;

    constructor(userRepository : IUserRepository ,emailService: IEmailService) {
        super();
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

    protected async runImpl(params: SendVerificationEmailDTO, context: any): Promise<SendVerificationEmailResponse> {
        const userEmail = params.email;

        const user : User | null = await this.userRepository.getByEmail(userEmail);

        assert(!!user , new UserEmailDoesNotExistError());

        const verificationToken = JWT.createToken({
            // @ts-ignore
            userId : user.userId,
        } , emailConfig.emailVerificationTokenSecret , emailConfig.emailVerificationExpiryTime);

        let verificationEmail = this.createVerificationEmail(userEmail, verificationToken);

        console.log(verificationEmail);

        await this.emailService.sendEmail(verificationEmail);

        return new SendVerificationEmailResponse();
    }

    protected inputConstraints = {
        email: {
            presence: true,
            email: true
        }
    }
}