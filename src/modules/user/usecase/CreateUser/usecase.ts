import { CreateUserDTO, CreateUserResponse, EmailAlreadyExistError, UsernameAlreadyTakenError } from "./types";
import { IUserRepository } from "../../repositories/IUserRepository";
import { User } from "../../domain/User";
import Password from "../../../../shared/packages/Password";
import { SendVerificationEmailUseCase } from "../SendEmailVerification/usecase";
import { assert } from "../../../../shared/core/Assert";
import {UseCase} from "../../../../shared/core/Usecase";

export class CreateUserUseCase extends UseCase<CreateUserDTO , CreateUserResponse>{
    private readonly userRepository: IUserRepository;
    private readonly sendVerificationEmail: SendVerificationEmailUseCase;

    constructor(userRepository: IUserRepository, sendVerificationEmail: SendVerificationEmailUseCase) {
        super();
        this.userRepository = userRepository;
        this.sendVerificationEmail = sendVerificationEmail;
    }

    protected async runImpl(params: CreateUserDTO, context: any): Promise<CreateUserResponse> {

        const { email, userName, password } = params;

        const emailExists = await this.userRepository.emailExists(email);

        assert(!emailExists, new EmailAlreadyExistError());

        const usernameExists = await this.userRepository.usernameExists(userName);

        assert(!usernameExists, new UsernameAlreadyTakenError());

        const hashedPassword = await Password.hashPassword(password);

        const user: User = new User({
            ...params,
            password: hashedPassword,
            authSecret: undefined,
            isEmailVerified: false,
            isDeleted: false
        });

        await this.userRepository.save(user);

        try {
            await this.sendVerificationEmail.run({ email: user.email }, {});
        } catch (e) {
            console.log(e);
        }

        return new CreateUserResponse();
    }

    protected inputConstraints = {
        userName: {
            presence: true,
            format: {
                pattern: "[a-z0-9]+",
                flags: "i",
                message: "can only contain a-z and 0-9"
            }
        },
        email: {
            presence: true,
            email: true
        },
        fullName: {
            presence: true,
            length: {
                minimum: 3,
                maximum: 30
            }
        },
        password: {
            presence: true,
            length: {
                minimum: 6,
                maximum: 30
            }
        }
    }
}