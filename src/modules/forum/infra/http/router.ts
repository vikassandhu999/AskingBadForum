import {Request, Router} from "express";
import {createCommentUseCase} from "../../usecase/CreateComment";
import {UserContext} from "../../../user/domain/UserContext";
import {authMiddleware} from "../../../user/infra/http/middlewares";
import {createThreadUseCase} from "../../usecase/CreateThread";

const forumRouter = Router();

forumRouter.post("/create-thread",
    authMiddleware.getUserContext(),
    async (req: Request, res, next) => {
        try {
            const response = await createThreadUseCase.run(req.body, req.context as UserContext);
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
            console.log(e);
            next(e);
        }
    });

forumRouter.get("/read-thread", async (req: Request, res, next) => {
    try {
        res.status(200).json("Hello World");
    } catch (e) {
        next(e);
    }
});


export {
    forumRouter
}