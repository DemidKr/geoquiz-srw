import {IRole} from "./IRole";

export interface IAuth {
    username: string;
    password: string;
}

export interface IAuthResponse {
    username: string,
    access_token: string,
    refresh_token: string,
    role: IRole,
    message?: string,
}