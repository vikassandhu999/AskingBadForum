import {HttpClient} from "../XShared/HttpClient";
import Result from "../XShared/Core/Result";
import axios from "axios";

class AuthService {
    client : HttpClient;
    baseUrl : string = "http://localhost:5000/v1"
    constructor(client : HttpClient) {
        this.client = client;
    }

    async login(data : any) : Promise<Result<{status : string}>> {
        return axios.post(this.baseUrl+"/user/login" , {...data})
            .then((res) => {
                return Result.success(res.data);
            }).catch(error => {
                return Result.fail(error.response.data);
            });
    }

    async register(data : any) : Promise<Result<{status : string}>> {
        return axios.post(this.baseUrl+"/user" , {...data})
            .then((res) => {
                return Result.success(res.data);
            }).catch(error => {
                return Result.fail(error.response.data);
            });
    }

}

const clientHttp = new HttpClient();

const authService = new AuthService(clientHttp);

export default authService;