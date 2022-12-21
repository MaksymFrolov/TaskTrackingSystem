import { AxiosError } from "axios"
import { AppDispatch } from "../.."
import TaskService from "../../../api/TaskService"
import { IStatus } from "../../../models/IStatus"
import { ITask } from "../../../models/ITask"
import { ITaskFormError } from "../../../models/ITaskFormError"
import { SetErrorAction, SetIsLoadingAction, SetTaskAction, SetTaskErrorAction, TaskActionEnum } from "./types"


export const TaskActionCreators = {
    setTask: (task: ITask): SetTaskAction => ({ type: TaskActionEnum.SET_TASK, payload: task }),
    setError: (payload: string): SetErrorAction => ({ type: TaskActionEnum.SET_ERROR, payload }),
    setTaskError: (payload: ITaskFormError): SetTaskErrorAction => ({ type: TaskActionEnum.SET_TASK_ERROR, payload }),
    setIsLoading: (payload: boolean): SetIsLoadingAction => ({ type: TaskActionEnum.SET_IS_LOADING, payload }),
    loadTask: (id: number) => async (dispatch: AppDispatch) => {
        try {
            dispatch(TaskActionCreators.setError(""))
            dispatch(TaskActionCreators.setIsLoading(true))
            const response = await TaskService.getTask(id)
            const task = response.data
            if (task) {
                dispatch(TaskActionCreators.setTask(task))
            }
            else {
                alert("Not found.")
                dispatch(TaskActionCreators.setError("Not found."))
            }
        }
        catch (e) {
            alert((e as Error).message)
            dispatch(TaskActionCreators.setError((e as Error).message))
        }
        finally{
            dispatch(TaskActionCreators.setIsLoading(false))
        }
    },
    addTask:(task: ITask) => async (dispatch: AppDispatch)=>{
        try{
            dispatch(TaskActionCreators.setError(""))
            dispatch(TaskActionCreators.setTaskError({}as ITaskFormError))
            dispatch(TaskActionCreators.setIsLoading(true))
            await TaskService.addTask(task)
        }
        catch (e) {
            alert((e as Error).message)
            dispatch(TaskActionCreators.setError((e as Error).message))
            const ae = ((e as AxiosError).response!.data as any).errors
            const name = ae?.Name
            const description = ae?.Description
            const startDate = ae?.StartDate
            const expiryDate = ae?.ExpiryDate
            dispatch(TaskActionCreators.setTaskError({name,description,startDate, expiryDate } as ITaskFormError))
        }
        finally{
            dispatch(TaskActionCreators.setIsLoading(false))
        }
    },
    updateTask:(task: ITask) => async (dispatch: AppDispatch)=>{
        try{
            dispatch(TaskActionCreators.setIsLoading(true))
            await TaskService.updateTask(task)
        }
        catch (e) {
            alert((e as Error).message)
            dispatch(TaskActionCreators.setError((e as Error).message))
        }
        finally{
            dispatch(TaskActionCreators.setIsLoading(false))
        }
    },
    updateTaskStatus:(id:number,status:IStatus) => async (dispatch: AppDispatch)=>{
        try{
            dispatch(TaskActionCreators.setIsLoading(true))
            await TaskService.updateTaskStatus(id,status)
        }
        catch (e) {
            alert((e as Error).message)
            dispatch(TaskActionCreators.setError((e as Error).message))
        }
        finally{
            dispatch(TaskActionCreators.setIsLoading(false))
        }
    },
    deleteTask:(id: number) => async (dispatch: AppDispatch)=>{
        try{
            dispatch(TaskActionCreators.setIsLoading(true))
            await TaskService.deleteTask(id)
        }
        catch (e) {
            alert((e as Error).message)
            dispatch(TaskActionCreators.setError((e as Error).message))
        }
        finally{
            dispatch(TaskActionCreators.setIsLoading(false))
        }
    }
}