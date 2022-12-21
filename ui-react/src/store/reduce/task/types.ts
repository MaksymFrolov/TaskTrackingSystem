import { ITask } from "../../../models/ITask"
import { ITaskFormError } from "../../../models/ITaskFormError"


export interface TaskState {
    task: ITask
    isLoading: boolean
    error: string
    taskError: ITaskFormError
}

export enum TaskActionEnum {
    SET_ERROR = 'SET_TASK_ERROR',
    SET_TASK_ERROR = 'SET_TASK_FORM_ERROR',
    SET_TASK = 'SET_TASK',
    SET_IS_LOADING = "SET_TASK_IS_LOADING"
}

export interface SetTaskErrorAction {
    type: TaskActionEnum.SET_TASK_ERROR
    payload: ITaskFormError
}
export interface SetErrorAction {
    type: TaskActionEnum.SET_ERROR
    payload: string
}
export interface SetTaskAction {
    type: TaskActionEnum.SET_TASK
    payload: ITask
}
export interface SetIsLoadingAction {
    type: TaskActionEnum.SET_IS_LOADING
    payload: boolean
}
export type TaskAction =
    SetErrorAction |
    SetTaskAction |
    SetIsLoadingAction |
    SetTaskErrorAction