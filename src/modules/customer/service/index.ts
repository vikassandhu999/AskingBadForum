import {AuthService} from "./authService";
import {authRepo} from "../repository";

const authService = new AuthService(authRepo);

export {
    authService
}