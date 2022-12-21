import { AxiosError } from "axios"
import { AppDispatch } from "../.."
import LoginService from "../../../api/LoginService"
import RoleService from "../../../api/RoleService"
import TokenService from "../../../api/TokenService"
import UserService from "../../../api/UserService"
import { ILoginFormError } from "../../../models/ILoginFormError"
import { IRole } from "../../../models/IRole"
import { IToken } from "../../../models/IToken"
import { IUser } from "../../../models/IUser"
import { AuthActionEnum, SetAuthAction, SetAuthRolesAction, SetAuthTokenAction, SetAuthUserAction, SetErrorAction, SetIsLoadingAction } from "./types"


export const AuthActionCreators = {
    setUser: (user: IUser): SetAuthUserAction => ({ type: AuthActionEnum.SET_USER, payload: user }),
    setIsAuth: (auth: boolean): SetAuthAction => ({ type: AuthActionEnum.SET_AUTH, payload: auth }),
    setIsLoading: (payload: boolean): SetIsLoadingAction => ({ type: AuthActionEnum.SET_IS_LOADING, payload }),
    setError: (payload: ILoginFormError): SetErrorAction => ({ type: AuthActionEnum.SET_ERROR, payload }),
    setToken: (payload: IToken): SetAuthTokenAction => ({ type: AuthActionEnum.SET_TOKEN, payload }),
    setRoles: (payload: IRole[]): SetAuthRolesAction => ({ type: AuthActionEnum.SET_ROLES, payload }),
    login: (login: string, password: string) => async (dispatch: AppDispatch) => {
        try {
            dispatch(AuthActionCreators.setError({} as ILoginFormError))
            dispatch(AuthActionCreators.setIsLoading(true))
            const response = await LoginService.login({ login: login, password: password })
            const token = response.data
            if (token) {
                localStorage.setItem('auth', 'true')
                localStorage.setItem('login', login)
                localStorage.setItem('accessToken', token.accessToken)
                localStorage.setItem('refreshToken', token.refreshToken)
                const users = (await UserService.getUsers()).data
                const user = users.find(t => t.email == login)
                if(user){
                    localStorage.setItem('id', user.id.toString())
                    dispatch(AuthActionCreators.setUser(user))
                    const roles = (await RoleService.getRolesByUserId(user.id)).data
                    dispatch(AuthActionCreators.setRoles(roles))
                }
                dispatch(AuthActionCreators.setIsAuth(true))
                dispatch(AuthActionCreators.setToken(token))
            }
            else {
                alert("Not Found.")
                dispatch(AuthActionCreators.setError({error:"Not Found.",password:[],email:[]} as ILoginFormError))
            }
        }
        catch (e) {
            alert((e as Error).message)
            const ae=(e as AxiosError).response!.data
            if(ae)
            {
                const password = (ae as any).errors?.Password
                const email = (ae as any).errors?.Login
                dispatch(AuthActionCreators.setError({error:(e as Error).message, password, email} as ILoginFormError))
            }
        }
        finally{
            dispatch(AuthActionCreators.setIsLoading(false))
        }
    },
    logout: () => async (dispatch: AppDispatch) => {
        try {
            dispatch(AuthActionCreators.setError({} as ILoginFormError))
            dispatch(AuthActionCreators.setIsLoading(true))
            const refreshToken = localStorage.getItem('refreshToken')
            const accessToken = localStorage.getItem('accessToken')
            await TokenService.revokeToken({ accessToken, refreshToken } as IToken)
        }
        catch (e) {
            alert((e as Error).message)
            dispatch(AuthActionCreators.setError({error:(e as Error).message,password:[],email:[]} as ILoginFormError))
        }
        finally{
            localStorage.removeItem('auth')
            localStorage.removeItem('login')
            localStorage.removeItem('accessToken')
            localStorage.removeItem('refreshToken')
            localStorage.removeItem('id')
            dispatch(AuthActionCreators.setUser({} as IUser))
            dispatch(AuthActionCreators.setRoles([] as IRole[]))
            dispatch(AuthActionCreators.setIsAuth(false))
            dispatch(AuthActionCreators.setToken({} as IToken))
            dispatch(AuthActionCreators.setIsLoading(false))
        }
    },
    auth: () => async (dispatch: AppDispatch) => {
        dispatch(AuthActionCreators.setIsLoading(true))
        const auth = localStorage.getItem('auth')
        const id = localStorage.getItem('id')
        const accessToken = localStorage.getItem('accessToken')
        const refreshToken = localStorage.getItem('refreshToken')
        if (auth && id && accessToken && refreshToken) {
            const user =  (await UserService.getUser(Number(id))).data
            dispatch(AuthActionCreators.setUser(user))
            const roles = (await RoleService.getRolesByUserId(user.id)).data
            dispatch(AuthActionCreators.setRoles(roles))
            dispatch(AuthActionCreators.setIsAuth(true))
            dispatch(AuthActionCreators.setToken({ accessToken, refreshToken } as IToken))
        }
        else{
            localStorage.removeItem('auth')
            localStorage.removeItem('login')
            localStorage.removeItem('accessToken')
            localStorage.removeItem('refreshToken')
            localStorage.removeItem('id')
            dispatch(AuthActionCreators.setUser({} as IUser))
            dispatch(AuthActionCreators.setRoles([] as IRole[]))
            dispatch(AuthActionCreators.setIsAuth(false))
            dispatch(AuthActionCreators.setToken({} as IToken))
        }
        dispatch(AuthActionCreators.setIsLoading(false))
    }
}