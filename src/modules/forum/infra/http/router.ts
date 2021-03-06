import {Request, Router} from "express";
import {createCommentUseCase} from "../../usecase/CreateComment";
import {UserContext} from "../../../user/domain/UserContext";
import {authMiddleware} from "../../../user/infra/http/middlewares";
import { createPostUseCase } from "../../usecase/CreatePost";
import { readPostUseCase } from "../../usecase/ReadPost";

const forumRouter = Router();

forumRouter.post("/create-post",
    authMiddleware.getUserContext(),
    async (req: Request, res, next) => {
        try {
            const response = await createPostUseCase.run(req.body, req.context as UserContext);
            res.status(200).json(response);
        } catch (e) {
            next(e);
        }
    });

forumRouter.post("/create-comment",
    authMiddleware.getUserContext(),
    async (req: Request, res, next) => {
        try {
            const response = await createCommentUseCase.run(req.body, req.context as UserContext);
            res.status(200).json(response);
        } catch (e) {
            next(e);
        }
    });

forumRouter.post("/read-post",
    authMiddleware.getUserContext(),
    async (req: Request, res, next) => {
    try {
        const response = await readPostUseCase.run(req.body, req.context as UserContext);
        res.status(200).json(response);
    } catch (e) {
        next(e);
    }
});


export {
    forumRouter
}