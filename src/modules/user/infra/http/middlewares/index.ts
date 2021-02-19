import {AuthMiddleware} from "./authMiddleware";
import {userRepository} from "../../../repositories";

const authMiddleware = new AuthMiddleware(userRepository);

export {
    authMiddleware
}