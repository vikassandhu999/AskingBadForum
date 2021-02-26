import {NextFunction, Request, Response} from "express";
import {BaseError} from "../../core/BaseError";

export const handleExpressErrors = async (err : BaseError | Error, req :Request, res : Response, next : NextFunction) => {
    console.log(err);
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