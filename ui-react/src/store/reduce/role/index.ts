import { IRole } from "../../../models/IRole"
import { RoleAction, RoleActionEnum, RoleState } from "./types"


const initialState: RoleState = {
    error: '',
    isLoading: true,
    role: {} as IRole
}

export default function roleReducer(state = initialState, action: RoleAction): RoleState {
    switch (action.type) {
        case RoleActionEnum.SET_ROLE:
            return { ...state, role: action.payload }
        case RoleActionEnum.SET_ERROR:
            return { ...state, error: action.payload }
        case RoleActionEnum.SET_IS_LOADING:
            return { ...state, isLoading: action.payload }
        default:
            return state
    }
}