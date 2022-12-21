import { FC, useEffect } from "react"
import { useActions } from "../hooks/useActions"
import { useTypedSelector } from "../hooks/useTypedSelector"
import { ProjectsActionCreators } from "../store/reduce/projects/action-creators"
import ProjectCard from "./ProjectCard"

interface ProjectListProps {
    id?: number
}

const ProjectList: FC<ProjectListProps> = ({id}) => {
    const { error, isLoading, projects } = useTypedSelector(state => state.projects)
    const { loadProjects } = useActions(ProjectsActionCreators)
    useEffect(() => {
        loadProjects(id)
    }, [])
    return (
        <>
            {
                projects.map(t =>
                    <div key={t.id} style={{margin:15}}>
                        <ProjectCard project={t} />
                    </div>
                )
            }
        </>
    )
}

export default ProjectList