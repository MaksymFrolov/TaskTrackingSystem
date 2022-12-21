import { IRegisterFormError } from "../../../models/IRegisterFormError"
import { IUser } from "../../../models/IUser"


export interface UserState {
    user: IUser
    isLoading: boolean
    error: string
    registerError:IRegisterFormError
}

export enum UserActionEnum {
    SET_ERROR = 'SET_USER_ERROR',
    SET_REGISTER_ERROR = 'SET_USER_REGISTER_ERROR',
    SET_USER = 'SET_USER',
    SET_IS_LOADING = "SET_USER_IS_LOADING"
}

export interface SetErrorAction {
    type: UserActionEnum.SET_ERROR
    payload: string
}
export interface SetRegisterErrorAction {
    type: UserActionEnum.SET_REGISTER_ERROR
    payload: IRegisterFormError
}
export interface SetUserAction {
    type: UserActionEnum.SET_USER
    payload: IUser
}
export interface SetIsLoadingAction {
    type: UserActionEnum.SET_IS_LOADING
    payload: boolean
}
export type UserAction =
    SetErrorAction |
    SetUserAction |
    SetIsLoadingAction |
    SetRegisterErrorAction