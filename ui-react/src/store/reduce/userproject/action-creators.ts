import { AppDispatch } from "../.."
import UserProjectService from "../../../api/UserProjectService"
import { IUserProject } from "../../../models/IUserProject"
import { SetErrorAction, SetIsLoadingAction, SetUserProjectAction, UserProjectActionEnum } from "./types"


export const UserProjectActionCreators = {
    setUserProject: (userProject: IUserProject): SetUserProjectAction => ({ type: UserProjectActionEnum.SET_USERPROJECT, payload: userProject }),
    setError: (payload: string): SetErrorAction => ({ type: UserProjectActionEnum.SET_ERROR, payload }),
    setIsLoading: (payload: boolean): SetIsLoadingAction => ({ type: UserProjectActionEnum.SET_IS_LOADING, payload }),
    loadUserProject: (id: number) => async (dispatch: AppDispatch) => {
        try {
            dispatch(UserProjectActionCreators.setError(""))
            dispatch(UserProjectActionCreators.setIsLoading(true))
            const response = await UserProjectService.getUserProject(id)
            const userProject = response.data
            if (userProject) {
                dispatch(UserProjectActionCreators.setUserProject(userProject))
            }
            else {
                alert("Not found.")
                dispatch(UserProjectActionCreators.setError("Not found."))
            }
        }
        catch (e) {
            alert((e as Error).message)
            dispatch(UserProjectActionCreators.setError((e as Error).message))
        }
        finally{
            dispatch(UserProjectActionCreators.setIsLoading(false))
        }
    },
    addUserProject:(userProject: IUserProject) => async (dispatch: AppDispatch)=>{
        try{
            dispatch(UserProjectActionCreators.setIsLoading(true))
            await UserProjectService.addUserProject(userProject)
        }
        catch (e) {
            alert((e as Error).message)
            dispatch(UserProjectActionCreators.setError((e as Error).message))
        }
        finally{
            dispatch(UserProjectActionCreators.setIsLoading(false))
        }
    },
    addUserProjects:(userProjects: IUserProject[]) => async (dispatch: AppDispatch)=>{
        try{
            dispatch(UserProjectActionCreators.setIsLoading(true))
            await UserProjectService.addUserProjects(userProjects)
        }
        catch (e) {
            alert((e as Error).message)
            dispatch(UserProjectActionCreators.setError((e as Error).message))
        }
        finally{
            dispatch(UserProjectActionCreators.setIsLoading(false))
        }
    },
    updateUserProject:(userProject: IUserProject) => async (dispatch: AppDispatch)=>{
        try{
            dispatch(UserProjectActionCreators.setIsLoading(true))
            await UserProjectService.updateUserProject(userProject)
        }
        catch (e) {
            alert((e as Error).message)
            dispatch(UserProjectActionCreators.setError((e as Error).message))
        }
        finally{
            dispatch(UserProjectActionCreators.setIsLoading(false))
        }
    },
    deleteUserProject:(id: number) => async (dispatch: AppDispatch)=>{
        try{
            dispatch(UserProjectActionCreators.setIsLoading(true))
            await UserProjectService.deleteUserProject(id)
        }
        catch (e) {
            alert((e as Error).message)
            dispatch(UserProjectActionCreators.setError((e as Error).message))
        }
        finally{
            dispatch(UserProjectActionCreators.setIsLoading(false))
        }
    },
    deleteUserProjects:(ids: number[]) => async (dispatch: AppDispatch)=>{
        try{
            dispatch(UserProjectActionCreators.setIsLoading(true))
            await UserProjectService.deleteUserProjects(ids)
        }
        catch (e) {
            alert((e as Error).message)
            dispatch(UserProjectActionCreators.setError((e as Error).message))
        }
        finally{
            dispatch(UserProjectActionCreators.setIsLoading(false))
        }
    }
}