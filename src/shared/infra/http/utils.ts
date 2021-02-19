import {NextFunction, Request, Response} from "express";
import {BaseError} from "../../core/BaseError";

export const handleExpressErrors = (err : BaseError | Error, req :Request, res : Response, next : NextFunction) => {
    if (err instanceof BaseError) {
        return res.status(err.httpCode).json({
            status: 'error',
            error: err.error
        });
    }

    return res.status(500).json({
        status: 'error',
        message: "Internal App Error",
        error : ""
    });
}