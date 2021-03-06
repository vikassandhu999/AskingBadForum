import express, {Request} from "express";
import {createUserUseCase} from "../../usecase/CreateUser";
import {sendEmailVerificationUseCase} from "../../usecase/SendEmailVerification";
import {loginUserUseCase} from "../../usecase/LoginUser";
import {verifyUserEmailUseCase} from "../../usecase/VerifyUserEmail";
import {authMiddleware} from "./middlewares";
import {getUserProfileUseCase} from "../../usecase/GetUserProfile";
import {UserContext} from "../../domain/UserContext";

const userRouter = express.Router();

userRouter.post("/user",
    async (req, res, next) => {
        try {
            const response = await createUserUseCase.run(req.body, {});
            res.status(200).json(response);
        } catch (e) {
            next(e);
        }
    });

userRouter.get("/user",
    authMiddleware.getUserContext()
    , async (req: Request, res, next) => {
        try {
            const response = await getUserProfileUseCase.run({}, req.context as UserContext);
            res.status(200).json(response);
        } catch (e) {
            next(e);
        }
    });

userRouter.get("/user/email/:email/verify",
    async (req, res, next) => {
        try {
            const email = req.params.email;
            const response = await sendEmailVerificationUseCase.run({email}, {});
            res.status(200).json(response);
        } catch (e) {
            next(e);
        }
    });

userRouter.post("/user/email/verify",
    async (req, res, next) => {
        try {
            const verificationToken = req.body.verificationToken;
            const response = await verifyUserEmailUseCase.run({verificationToken}, {});
            res.status(200).json(response);
        } catch (e) {
            next(e);
        }
    });

userRouter.post("/user/login",
    async (req, res, next) => {
        try {
            const response = await loginUserUseCase.run(req.body, {});
            res.cookie("access-token", response.accessToken);
            res.cookie("refresh-token", response.refreshToken);
            res.status(200).json({status: "success"});
        } catch (e) {
            next(e);
        }
    });

export {
    userRouter
}