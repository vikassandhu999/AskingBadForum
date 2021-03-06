import axios from "axios";
import Result from "../../shared/core/Result";

export type LoginProps = {
    email : string;
    password:  string;
}

export type RegisterProps = {
    fullName : string;
    userName : string;
    email : string;
    password : string;
}

export type EmailVerificationProps = {
    email : string;
}

const baseUrl = "http://localhost:5000/v1";

class AuthService {
    loginUrl = baseUrl+'user/login';

    async login(props : LoginProps) : Promise<Result<{},{}>> {
        return await axios.post(this.loginUrl , props)
            .then(response => {
                return Result.success(response.data);
            }).catch(error => {
                return Result.error("This is a major error");
            });
    }

    async regiser(props : RegisterProps) : Promise<Result> {
        console.log("From Service" , props);
        return Result.error<string>("Email or Password doesn't match");
    }

    async emailVerification(props : EmailVerificationProps) : Promise<Result> {
        console.log("From Service" , props);
        return Result.error<string>("Email or Password doesn't match");
    }

}

const authService = new AuthService();

export default authService;