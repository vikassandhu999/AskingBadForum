import {IUserRepository} from "../../../repositories/IUserRepository";
import {Request ,Response ,NextFunction} from "express";
import {UserContext} from "../../../domain/UserContext";
import {NotEnoughInformationProvidedError} from "../../../../../shared/core/NotEnoughInformationProvidedError";
import {JWT} from "../../../../../shared/packages/jwt";
import authConfig from "../../../../../config/authConfig";
import {UnauthorizedAccessError} from "../../../../../shared/core/UnathorizedAccessError";

export class AuthMiddleware {
    private readonly userRepository : IUserRepository;
    constructor(userRepository : IUserRepository) {
        this.userRepository = userRepository;
    }


    public async getUserContext(req : Request) : Promise<UserContext> {
        const accessToken = req.cookies["access-token"];
        if(!accessToken) throw new NotEnoughInformationProvidedError();

        const decodedAccessToken = await JWT.verify(accessToken , authConfig.accessSecret);

        if(decodedAccessToken) {
            return {
                userId : decodedAccessToken.userId ,
                accessLevel: 0 ,
                userName : decodedAccessToken.userName ,
                isAuthenticated : true
            }
        }

        //todo : refresh accessToken using refreshToken
        //if accessToken fails
        // const refreshToken = req.cookies["refresh-token"];
        // if(!refreshToken) throw new NotEnoughInformationProvidedError();
        //
        // const authSecret =
        //
        // const decodedRefreshToken = await JWT.verify(refreshToken , authConfig.accessSecret);
        //
        // if(decodedRefreshToken) {
        //
        // }
        //
        throw new UnauthorizedAccessError();
    }

}