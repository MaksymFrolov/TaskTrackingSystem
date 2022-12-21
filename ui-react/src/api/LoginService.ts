import axios, { AxiosResponse } from "axios";
import { ILogin } from "../models/ILogin";
import { IToken } from "../models/IToken";
import { url } from "./axiosConfigure";

export default class LoginService {
    static async login(user: ILogin): Promise<AxiosResponse<IToken>> {
        return axios.post<IToken>(url+'/api/auth', user)
    }
}