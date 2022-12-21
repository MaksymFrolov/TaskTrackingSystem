import { IRegisterFormError } from "../../../models/IRegisterFormError"
import { IUser } from "../../../models/IUser"
import { UserAction, UserActionEnum, UserState } from "./types"


const initialState: UserState = {
    error: '',
    isLoading: true,
    user: {} as IUser,
    registerError: {} as IRegisterFormError,
}

export default function userReducer(state = initialState, action: UserAction): UserState {
    switch (action.type) {
        case UserActionEnum.SET_USER:
            return { ...state, user: action.payload }
        case UserActionEnum.SET_ERROR:
            return { ...state, error: action.payload }
        case UserActionEnum.SET_REGISTER_ERROR:
            return { ...state, registerError: action.payload }
        case UserActionEnum.SET_IS_LOADING:
            return { ...state, isLoading: action.payload }
        default:
            return state
    }
}