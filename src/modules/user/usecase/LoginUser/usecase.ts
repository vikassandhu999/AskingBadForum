import {v4 as uuid} from "uuid";
import {EmailNotVerifiedError, EmailOrPasswordDidNotMatch, LoginUserDTO, LoginUserResponse} from "./types";
import validate from "validate.js";
import {BaseError} from "../../../../shared/core/BaseError";
import {User} from "../../domain/User";
import Password from "../../../../shared/packages/Password";
import {IUserRepository} from "../../repositories/IUserRepository";
import {JWT} from "../../../../shared/packages/jwt";
import authConfig from "../../../../config/authConfig";

type GetLoginTokensResponse = {accessToken : string , refreshToken : string};

export class LoginUserUseCase {
    private readonly userRepository: IUserRepository;

    constructor(userRepository: IUserRepository) {
        this.userRepository = userRepository;
    }

    private async getLoginTokens(user : User) : Promise<GetLoginTokensResponse> {
        const accessToken = JWT.createToken({
            userId : user.userId ,
            userName : user.userName
        } , authConfig.accessSecret , authConfig.accessTokenExpiryToken);

        const authSecret = uuid();

        const refreshToken = JWT.createToken({
            userId : user.userId,
            userName : user.userName,
        } , authSecret , authConfig.refreshExpiryTime);

        await this.userRepository.setAuthSecret(user.userId , authSecret);

        return {accessToken , refreshToken};
    }

    public async run(params: LoginUserDTO, context: any): Promise<LoginUserResponse> {
        await this.validateInput(params);
        const {email, password} = params;

        const user: User | null = await this.userRepository.getByEmail(email);

        if (!user) throw new EmailOrPasswordDidNotMatch();

        if(!user.isEmailVerified) throw new EmailNotVerifiedError();

        const passwordMatched = await Password.compare(password, user.password);

        if (!passwordMatched) throw new EmailOrPasswordDidNotMatch();

        const loginTokens = await this.getLoginTokens(user);

        return new LoginUserResponse(loginTokens.accessToken , loginTokens.refreshToken);
    }

    private async validateInput(params: LoginUserDTO): Promise<void> {
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