import jwt from "jsonwebtoken";
import {IJWTAuthStratergy, IJWTAuthTokens, ITokenStore} from "./types";

const DEFAULT_EXPIRY_TIME = 600; // 10 minutes

export interface IJWTAuthProps<K, V> {
    tokenStore: ITokenStore<V>;
    secret?: string;
    expiryTime?: number;
}

export class JWTAuth<K, V> implements IJWTAuthStratergy<K, V> {
    tokenStore: ITokenStore<V>;
    secret: string;
    expiryTime: number;

    constructor(props: IJWTAuthProps<K, V>) {
        this.tokenStore = props.tokenStore;
        this.secret = props.secret ?? "123124124";
        this.expiryTime = props.expiryTime ?? DEFAULT_EXPIRY_TIME;
    }

    async authenticate(uniqueID: K, authClaims: V): Promise<IJWTAuthTokens> {
        const accessToken = this.createAccessToken(authClaims);
        const refreshToken = this.createRefreshToken();
        await this.tokenStore.save(refreshToken, authClaims);
        return {accessToken, refreshToken};
    }

    private createAccessToken(payload: V): string {
        //@ts-ignore
        return jwt.sign(payload, this.secret, {expiresIn: this.expiryTime});
    }

    private createRefreshToken(): string {
        return "asdfjsadkfj";
    }

}