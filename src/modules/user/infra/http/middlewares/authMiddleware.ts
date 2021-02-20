import {IUserRepository} from "../../../repositories/IUserRepository";
import {NextFunction, Request, Response} from "express";
import {NotEnoughInformationProvidedError} from "../../../../../shared/core/NotEnoughInformationProvidedError";
import {JWT} from "../../../../../shared/packages/jwt";
import authConfig from "../../../../../config/authConfig";
import {UnauthorizedAccessError} from "../../../../../shared/core/UnathorizedAccessError";
import {BaseError} from "../../../../../shared/core/BaseError";

export class AuthMiddleware {
    private readonly userRepository: IUserRepository;

    constructor(userRepository: IUserRepository) {
        this.userRepository = userRepository;
    }

    public getUserContext() {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                const accessToken = req.cookies["access-token"];
                if (!accessToken) throw new NotEnoughInformationProvidedError();

                const decodedAccessToken = await JWT.verify(accessToken, authConfig.accessSecret);

                if (decodedAccessToken) {
                    req.context = {
                        userId: decodedAccessToken.userId,
                        accessLevel: 0,
                        userName: decodedAccessToken.userName,
                        isAuthenticated: true
                    };
                    next();
                }

                //if accessToken fails
                const refreshToken = req.cookies["refresh-token"];
                if (!refreshToken) throw new NotEnoughInformationProvidedError();

                const decodedData = JWT.decode(refreshToken);
                if (!decodedData) throw new NotEnoughInformationProvidedError();

                const userId = decodedData.userId;

                const authSecret = await this.userRepository.getAuthSecret(userId);

                if (!authSecret) throw new UnauthorizedAccessError();

                const decodedRefreshToken = await JWT.verify(refreshToken, authSecret);

                if (!decodedRefreshToken) throw new UnauthorizedAccessError();

                //create new accesstoken
                const newAccessToken = JWT.createToken({
                    userId: decodedRefreshToken.userId,
                    userName: decodedRefreshToken.userName
                }, authConfig.accessSecret, authConfig.accessTokenExpiryToken);

                req.context = {
                    userId: decodedRefreshToken.userId,
                    accessLevel: 0,
                    userName: decodedRefreshToken.userName,
                    isAuthenticated: true
                };

                res.cookie("access-token" , newAccessToken);
                next();
            } catch (err) {
                if (err instanceof BaseError) {
                    return res.status(err.httpCode).json({
                        status: 'error',
                        error: err.error
                    });
                } else {
                    return res.status(500).json({
                        status: 'error',
                        message: "Internal App Error",
                        error : ""
                    });
                }
            }
        }
    }
}