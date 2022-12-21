import { AxiosError } from "axios"
import { AppDispatch } from "../.."
import RoleService from "../../../api/RoleService"
import UserService from "../../../api/UserService"
import { IRegisterFormError } from "../../../models/IRegisterFormError"
import { IRegisterUser } from "../../../models/IRegisterUser"
import { IRole } from "../../../models/IRole"
import { IUpdateUser } from "../../../models/IUpdateUser"
import { IUser } from "../../../models/IUser"
import { AuthActionCreators } from "../auth/action-creators"
import { SetErrorAction, SetIsLoadingAction, SetRegisterErrorAction, SetUserAction, UserActionEnum } from "./types"


export const UserActionCreators = {
    setUser: (user: IUser): SetUserAction => ({ type: UserActionEnum.SET_USER, payload: user }),
    setError: (payload: string): SetErrorAction => ({ type: UserActionEnum.SET_ERROR, payload }),
    setRegisterError: (payload: IRegisterFormError): SetRegisterErrorAction => ({ type: UserActionEnum.SET_REGISTER_ERROR, payload }),
    setIsLoading: (payload: boolean): SetIsLoadingAction => ({ type: UserActionEnum.SET_IS_LOADING, payload }),
    loadUser: (id: number) => async (dispatch: AppDispatch) => {
        try {
            dispatch(UserActionCreators.setError(""))
            dispatch(UserActionCreators.setIsLoading(true))
            const response = await UserService.getUser(id)
            const user = response.data
            if (user) {
                dispatch(UserActionCreators.setUser(user))
            }
            else {
                alert("Not found.")
                dispatch(UserActionCreators.setError("Not found."))
            }
        }
        catch (e) {
            alert((e as Error).message)
            dispatch(UserActionCreators.setError((e as Error).message))
        }
        finally{
            dispatch(UserActionCreators.setIsLoading(false))
        }
    },
    addUser:(user: IRegisterUser) => async (dispatch: AppDispatch)=>{
        try{
            dispatch(UserActionCreators.setError(""))
            dispatch(UserActionCreators.setRegisterError({}as IRegisterFormError))
            dispatch(UserActionCreators.setIsLoading(true))
            await UserService.addUser(user)
        }
        catch (e) {
            alert((e as Error).message)
            dispatch(UserActionCreators.setError((e as Error).message))
            const ae = ((e as AxiosError).response!.data as any).errors
            const firstName = ae.FirstName
            const lastName = ae.LastName
            const userName = ae.userName
            const password = ae.Password
            const confirmPassword = ae.ConfirmPassword
            const email = ae.Email
            dispatch(UserActionCreators.setRegisterError({firstName,lastName,userName, password,confirmPassword,email } as IRegisterFormError))
        }
        finally{
            dispatch(UserActionCreators.setIsLoading(false))
        }
    },
    addUserToRole:(id: number, role:IRole) => async (dispatch: AppDispatch)=>{
        try{
            dispatch(UserActionCreators.setIsLoading(true))
            await RoleService.addToRole(id, role)
        }
        catch (e) {
            alert((e as Error).message)
            dispatch(UserActionCreators.setError((e as Error).message))
        }
        finally{
            dispatch(UserActionCreators.setIsLoading(false))
        }
    },
    addUserToRoles:(id: number, roles:IRole[]) => async (dispatch: AppDispatch)=>{
        try{
            dispatch(UserActionCreators.setIsLoading(true))
            await RoleService.addToRoles(id, roles)
        }
        catch (e) {
            alert((e as Error).message)
            dispatch(UserActionCreators.setError((e as Error).message))
        }
        finally{
            dispatch(UserActionCreators.setIsLoading(false))
        }
    },
    updateUser:(user: IUpdateUser) => async (dispatch: AppDispatch)=>{
        try{
            dispatch(UserActionCreators.setIsLoading(true))
            await UserService.updateUser(user)
        }
        catch (e) {
            alert((e as Error).message)
            dispatch(UserActionCreators.setError((e as Error).message))
        }
        finally{
            dispatch(UserActionCreators.setIsLoading(false))
        }
    },
    deleteUser:(id: number) => async (dispatch: AppDispatch)=>{
        try{
            dispatch(UserActionCreators.setIsLoading(true))
            await UserService.deleteUser(id)
            const localId = localStorage.getItem('id')
            if(id.toString()===localId){
                AuthActionCreators.logout()
            }
        }
        catch (e) {
            alert((e as Error).message)
            dispatch(UserActionCreators.setError((e as Error).message))
        }
        finally{
            dispatch(UserActionCreators.setIsLoading(false))
        }
    },
    deleteUserToRole:(id: number, name: string) => async (dispatch: AppDispatch)=>{
        try{
            dispatch(UserActionCreators.setIsLoading(true))
            await RoleService.deleteToRole(id, name)
        }
        catch (e) {
            alert((e as Error).message)
            dispatch(UserActionCreators.setError((e as Error).message))
        }
        finally{
            dispatch(UserActionCreators.setIsLoading(false))
        }
    },
    deleteUserToRoles:(id: number, names: string[]) => async (dispatch: AppDispatch)=>{
        try{
            dispatch(UserActionCreators.setIsLoading(true))
            await RoleService.deleteToRoles(id, names)
        }
        catch (e) {
            alert((e as Error).message)
            dispatch(UserActionCreators.setError((e as Error).message))
        }
        finally{
            dispatch(UserActionCreators.setIsLoading(false))
        }
    }
}