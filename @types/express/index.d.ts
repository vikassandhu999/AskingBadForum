import {UserContext} from "../../src/modules/user/domain/UserContext";

declare module 'express' {
    export interface Request {
        context?: UserContext
    }
}