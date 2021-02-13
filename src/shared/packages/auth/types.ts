export interface ITokenStore<V> {
    save(key: string, value: V): Promise<void>;

    exists(key: string): Promise<boolean>;

    find(key: string): Promise<V>;
}

export interface IJWTAuthTokens {
    accessToken: string;
    refreshToken: string;
}

export interface IJWTAuthStratergy<K, V> {
    authenticate(uniqueID: K, authClaims: V): Promise<IJWTAuthTokens>
}

export enum AuthType {
    JWT,
}