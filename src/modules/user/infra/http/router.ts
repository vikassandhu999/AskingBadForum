import express from "express";
import {createUserUseCase} from "../../usecase/CreateUser";
import {sendEmailVerificationUseCase} from "../../usecase/SendEmailVerification";
import {loginUserUseCase} from "../../usecase/LoginUser";
import {verifyUserEmailUseCase} from "../../usecase/VerifyUserEmail";
import {authMiddleware} from "./middlewares";


const userRouter = express.Router();


userRouter.post("/user/create",
    async (req, res, next) => {
        try {
            const response = await createUserUseCase.run(req.body, {});
            res.status(200).json(response);
        } catch (e) {
            next(e);
        }
    });


userRouter.post("/user/send-email-verification",
    async (req, res, next) => {
        try {
            const response = await sendEmailVerificationUseCase.run(req.body, {});
            res.status(200).json(response);
        } catch (e) {
            next(e);
        }
    });

userRouter.post("/user/verify-email",
    async (req, res, next) => {
        try {
            const response = await verifyUserEmailUseCase.run(req.body, {});
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


userRouter.get("/user" , async (req, res, next) => {
    try {
            const userContext = await authMiddleware.getUserContext(req);
            res.status(200).json(userContext);
    } catch (e) {
        next(e);
    }
});

export {
    userRouter
}