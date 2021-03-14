import {UserContext} from "../../src/user/domain/UserContext";

declare module 'express' {
    export interface Request {
        context?: UserContext
        pageQuery?:any
    }
}