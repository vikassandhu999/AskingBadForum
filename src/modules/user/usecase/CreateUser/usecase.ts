import {CreateUserDTO, CreateUserResponse, EmailAlreadyExistError, UsernameAlreadyTakenError} from "./types";
import validate from "validate.js";
import {BaseError} from "../../../../shared/core/BaseError";
import {IUserRepository} from "../../repositories/IUserRepository";
import {User} from "../../domain/User";
import Password from "../../../../shared/packages/Password";
import {SendVerificationEmailUseCase} from "../SendEmailVerification/usecase";
import { Assert } from "../../../../shared/core/Assert";
import { MongooseUserRepository } from '../../repositories/imples/MongooseUserRepository';

export class CreateUserUseCase {
    private readonly userRepository: IUserRepository;
    private readonly sendVerificationEmail : SendVerificationEmailUseCase;

    constructor(userRepository: IUserRepository,sendVerificationEmail : SendVerificationEmailUseCase) {
        this.userRepository = userRepository;
        this.sendVerificationEmail = sendVerificationEmail;
    }

    public async run(params: CreateUserDTO, context: any): Promise<CreateUserResponse> {

        await this.validateInput(params);

        const {email, userName, password} = params;

        const emailExists = await this.userRepository.emailExists(email);

        Assert(emailExists, new EmailAlreadyExistError());

        const usernameExists = await this.userRepository.usernameExists(userName);

        Assert(usernameExists, new UsernameAlreadyTakenError());

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
            await this.sendVerificationEmail.run({email : user.email} , {});
        } catch (e) {
            console.log(e);
        }

        return new CreateUserResponse();
    }

    private async validateInput(params: CreateUserDTO): Promise<void> {
        const validation = validate(params, this.inputConstraints);
        if (!validation) {
            return;
        }
        throw new BaseError(validation, 400);
    }

    private inputConstraints = {
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