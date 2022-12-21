import { AppDispatch } from "../.."
import ProjectService from "../../../api/ProjectService"
import { IProject } from "../../../models/IPoject"
import { ProjectsActionEnum, SetErrorAction, SetIsLoadingAction, SetProjectsAction } from "./types"


export const ProjectsActionCreators = {
    setProjects: (projects: IProject[]): SetProjectsAction => ({ type: ProjectsActionEnum.SET_PROJECTS, payload: projects }),
    setError: (payload: string): SetErrorAction => ({ type: ProjectsActionEnum.SET_ERROR, payload }),
    setIsLoading: (payload: boolean): SetIsLoadingAction => ({ type: ProjectsActionEnum.SET_IS_LOADING, payload }),
    loadProjects: (id?:number) => async (dispatch: AppDispatch) => {
        try {
            dispatch(ProjectsActionCreators.setError(""))
            dispatch(ProjectsActionCreators.setIsLoading(true))
            let response
            if(id){
                response = await ProjectService.getProjectsByUserId(id)
            } 
            else{
                response = await ProjectService.getProjects()
            }
            const projects = response.data
            if (projects.length != 0) {
                dispatch(ProjectsActionCreators.setProjects(projects))
            }
            else {
                alert("Not found.")
                dispatch(ProjectsActionCreators.setError("Not found."))
            }
        }
        catch (e) {
            alert((e as Error).message)
            dispatch(ProjectsActionCreators.setError((e as Error).message))
        }
        finally{
            dispatch(ProjectsActionCreators.setIsLoading(false))
        }
    }
}