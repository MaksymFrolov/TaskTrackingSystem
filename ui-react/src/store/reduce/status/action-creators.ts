import { AxiosError } from "axios"
import { AppDispatch } from "../.."
import ProjectStatusService from "../../../api/ProjectStatusService"
import TaskStatusService from "../../../api/TaskStatusService"
import { IStatus } from "../../../models/IStatus"
import { IStatusFormError } from "../../../models/IStatusFormError"
import { SetErrorAction, SetIsLoadingAction, SetStatusAction, SetStatusErrorAction, StatusActionEnum } from "./types"

export enum StatusEnum{
    BY_TASK = "Task",
    BY_PROJECT = "Project"
}

export const StatusActionCreators = {
    setStatus: (status: IStatus): SetStatusAction => ({ type: StatusActionEnum.SET_STATUS, payload: status }),
    setError: (payload: string): SetErrorAction => ({ type: StatusActionEnum.SET_ERROR, payload }),
    setStatusError: (payload: IStatusFormError): SetStatusErrorAction => ({ type: StatusActionEnum.SET_STATUS_ERROR, payload }),
    setIsLoading: (payload: boolean): SetIsLoadingAction => ({ type: StatusActionEnum.SET_IS_LOADING, payload }),
    loadStatus: (type:StatusEnum, id: number) => async (dispatch: AppDispatch) => {
        try {
            dispatch(StatusActionCreators.setError(""))
            dispatch(StatusActionCreators.setIsLoading(true))
            let response
            switch(type){
                case StatusEnum.BY_PROJECT:
                    response = await ProjectStatusService.getStatus(id)
                    break
                case StatusEnum.BY_TASK:
                    response = await TaskStatusService.getStatus(id)
                    break
            }
            const status = response.data
            if (status) {
                dispatch(StatusActionCreators.setStatus(status))
            }
            else {
                alert("Not found.")
                dispatch(StatusActionCreators.setError("Not found."))
            }
        }
        catch (e) {
            alert((e as Error).message)
            dispatch(StatusActionCreators.setError((e as Error).message))
        }
        finally{
            dispatch(StatusActionCreators.setIsLoading(false))
        }
    },
    addStatus:(type:StatusEnum, status: IStatus) => async (dispatch: AppDispatch)=>{
        try{
            dispatch(StatusActionCreators.setIsLoading(true))
            dispatch(StatusActionCreators.setError(""))
            dispatch(StatusActionCreators.setStatusError({}as IStatusFormError))
            switch(type){
                case StatusEnum.BY_PROJECT:
                    await ProjectStatusService.addStatus(status)
                    break
                case StatusEnum.BY_TASK:
                    await TaskStatusService.addStatus(status)
                    break
            }
        }
        catch (e) {
            alert((e as Error).message)
            dispatch(StatusActionCreators.setError((e as Error).message))
            const ae = ((e as AxiosError).response!.data as any).errors
            const name = ae?.Name
            dispatch(StatusActionCreators.setStatusError({name } as IStatusFormError))
        }
        finally{
            dispatch(StatusActionCreators.setIsLoading(false))
        }
    },
    updateStatus:(type:StatusEnum, status: IStatus) => async (dispatch: AppDispatch)=>{
        try{
            dispatch(StatusActionCreators.setIsLoading(true))
            switch(type){
                case StatusEnum.BY_PROJECT:
                    await ProjectStatusService.updateStatus(status)
                    break
                case StatusEnum.BY_TASK:
                    await TaskStatusService.updateStatus(status)
                    break
            }
        }
        catch (e) {
            alert((e as Error).message)
            dispatch(StatusActionCreators.setError((e as Error).message))
        }
        finally{
            dispatch(StatusActionCreators.setIsLoading(false))
        }
    },
    deleteStatus:(type:StatusEnum, id: number) => async (dispatch: AppDispatch)=>{
        try{
            dispatch(StatusActionCreators.setIsLoading(true))
            switch(type){
                case StatusEnum.BY_PROJECT:
                    await ProjectStatusService.deleteStatus(id)
                    break
                case StatusEnum.BY_TASK:
                    await TaskStatusService.deleteStatus(id)
                    break
            }
        }
        catch (e) {
            alert((e as Error).message)
            dispatch(StatusActionCreators.setError((e as Error).message))
        }
        finally{
            dispatch(StatusActionCreators.setIsLoading(false))
        }
    }
}