import {v4 as uuid} from "uuid";

export type UserDTO = {
    userId: string;
    userName: string;
    fullName: string;
    email: string;
    password: string;
    isEmailVerified: boolean;
    isDeleted: boolean;
    createdAt: Date;
    authSecret?: string;
}

export class User {
    public userId: string;
    public userName: string;
    public fullName: string;
    public email: string;
    public password: string;
    public isEmailVerified: boolean;
    public isDeleted: boolean;
    public createdAt: Date;
    public authSecret?: string;

    constructor(params: any) {
        this.userId = params.userId ?? uuid();
        this.userName = params.userName;
        this.fullName = params.fullName;
        this.email = params.email;
        this.password = params.password;
        this.isEmailVerified = params.isEmailVerified ?? false;
        this.isDeleted = params.isDeleted ?? false;
        this.createdAt = params.createdAt ?? new Date();
        this.authSecret = params.authSecret ?? undefined;
    }

    toDTO(): UserDTO {
        return {
            userId: this.userId,
            userName: this.userName,
            fullName: this.fullName,
            email: this.email,
            password: this.password,
            isEmailVerified: this.isEmailVerified,
            isDeleted: this.isDeleted,
            createdAt: this.createdAt,
            authSecret: this.authSecret
        }
    }
}