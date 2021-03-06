import {Request, Router} from "express";
import {createCommentUseCase} from "../../usecase/CreateComment";
import {UserContext} from "../../../user/domain/UserContext";
import {authMiddleware} from "../../../user/infra/http/middlewares";
import { createPostUseCase } from "../../usecase/CreatePost";

const forumRouter = Router();

forumRouter.post("/post",
    authMiddleware.getUserContext(),
    async (req: Request, res, next) => {
        try {
            const response = await createPostUseCase.run(req.body, req.context as UserContext);
            res.status(200).json(response);
        } catch (e) {
            next(e);
        }
    });

forumRouter.post("/post/:postId/comment",
    authMiddleware.getUserContext(),
    async (req: Request, res, next) => {
        try {
            const postId = req.params.postId;
            const replyTo = req.params.replyTo;
            const body = req.params.body;

            const response = await createCommentUseCase.run({postId , replyTo, body}, req.context as UserContext);
            res.status(200).json(response);
        } catch (e) {
            next(e);
        }
    });


forumRouter.get("/post/:postId",
    authMiddleware.getUserContext(),
    async (req: Request, res, next) => {
    try {
        // const response = await readPostUseCase.run(req.body, req.context as UserContext);
        res.status(200).json({"response" : ""});
    } catch (e) {
        next(e);
    }
});


forumRouter.get("/post/:postId/comment/:replyTo",
    authMiddleware.getUserContext(),
    async (req: Request, res, next) => {
        try {
            const postId = req.params.postId;
            const replyTo = req.params.replyTo;

            // const response = await readPostUseCase.run(req.body, req.context as UserContext);
            res.status(200).json({"response" : ""});
        } catch (e) {
            next(e);
        }
    });


export {
    forumRouter
}