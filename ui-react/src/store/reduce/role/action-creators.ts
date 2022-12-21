import { AppDispatch } from "../.."
import RoleService from "../../../api/RoleService"
import { IRole } from "../../../models/IRole"
import { RoleActionEnum, SetErrorAction, SetIsLoadingAction, SetRoleAction } from "./types"


export const RoleActionCreators = {
    setRole: (role: IRole): SetRoleAction => ({ type: RoleActionEnum.SET_ROLE, payload: role }),
    setError: (payload: string): SetErrorAction => ({ type: RoleActionEnum.SET_ERROR, payload }),
    setIsLoading: (payload: boolean): SetIsLoadingAction => ({ type: RoleActionEnum.SET_IS_LOADING, payload }),
    loadRole: (id: number) => async (dispatch: AppDispatch) => {
        try {
            dispatch(RoleActionCreators.setError(""))
            dispatch(RoleActionCreators.setIsLoading(true))
            const response = await RoleService.getRole(id)
            const role = response.data
            if (role) {
                dispatch(RoleActionCreators.setRole(role))
            }
            else {
                alert("Not found.")
                dispatch(RoleActionCreators.setError("Not found."))
            }
        }
        catch (e) {
            alert((e as Error).message)
            dispatch(RoleActionCreators.setError((e as Error).message))
        }
        finally{
            dispatch(RoleActionCreators.setIsLoading(false))
        }
    },
    addRole:(role: IRole) => async (dispatch: AppDispatch)=>{
        try{
            dispatch(RoleActionCreators.setIsLoading(true))
            await RoleService.addRole(role)
        }
        catch (e) {
            alert((e as Error).message)
            dispatch(RoleActionCreators.setError((e as Error).message))
        }
        finally{
            dispatch(RoleActionCreators.setIsLoading(false))
        }
    },
    updateRole:(role: IRole) => async (dispatch: AppDispatch)=>{
        try{
            dispatch(RoleActionCreators.setIsLoading(true))
            await RoleService.updateRole(role)
        }
        catch (e) {
            alert((e as Error).message)
            dispatch(RoleActionCreators.setError((e as Error).message))
        }
        finally{
            dispatch(RoleActionCreators.setIsLoading(false))
        }
    },
    deleteRole:(id: number) => async (dispatch: AppDispatch)=>{
        try{
            dispatch(RoleActionCreators.setIsLoading(true))
            await RoleService.deleteRole(id)
        }
        catch (e) {
            alert((e as Error).message)
            dispatch(RoleActionCreators.setError((e as Error).message))
        }
        finally{
            dispatch(RoleActionCreators.setIsLoading(false))
        }
    }
}