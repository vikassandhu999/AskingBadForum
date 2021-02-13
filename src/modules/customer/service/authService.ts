import jwt from "jsonwebtoken";
import { v4 as uuid } from "uuid";
import {IAuthRepo} from "../repository/IAuthRepo";
import {ICustomerClaims} from "../dto/ICustomerClaims";
import authConfig from "../../../config/authConfig";
import {CustomerAuthSecret} from "../domain/CustomerAuthSecret";

export interface IAuthTokens {
    accessToken : string;
    refreshToken : string;
}

//todo : encrypt tokens before exposing it to the users due security reasons
export class AuthService {
    private readonly authRepo : IAuthRepo;
    constructor(authRepo : IAuthRepo) {
        this.authRepo = authRepo;
    }

    public async generateAuthTokens(customerId : string , claims : ICustomerClaims) : Promise<IAuthTokens> {
        const accessToken = AuthService.createAccessToken(claims);
        const refreshSecret = AuthService.getRandomSecret();
        const refreshToken = AuthService.createRefreshToken(claims, refreshSecret);

        await this.authRepo.saveOne(CustomerAuthSecret.make({...claims,secret : refreshSecret}));

        return {accessToken , refreshToken};
    }

    public async verifyAccessToken(accessToken : string) : Promise<ICustomerClaims> {
        return {} as ICustomerClaims;
    }

    private static getRandomSecret() : string {
        return uuid();
    }

    private static createAccessToken(payload : ICustomerClaims) : string {
        return jwt.sign(payload , authConfig.accessSecret , {
            expiresIn : authConfig.accessTokenExpiryToken
        })
    }

    private static createRefreshToken(payload : ICustomerClaims, secret : string) : string {
        return jwt.sign(payload , secret , {
            expiresIn : authConfig.refreshExpiryTime
        })
    }

}