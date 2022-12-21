import { FC, useEffect } from "react"
import { Button } from "react-bootstrap"
import Card from "react-bootstrap/esm/Card"
import { useNavigate, useParams } from "react-router-dom"
import { useActions } from "../hooks/useActions"
import { useTypedSelector } from "../hooks/useTypedSelector"
import { ProjectActionCreators } from "../store/reduce/project/action-creators"
import { convertDate } from "../utils/convertDate"



const ProjectDetailCard: FC = () => {
    const navigate = useNavigate()
    const { project } = useTypedSelector(t => t.project)
    const { loadProject, deleteProject } = useActions(ProjectActionCreators)
    const { isAuth, roles } = useTypedSelector(state => state.auth)
    const param = useParams()
    useEffect(() => {
        loadProject(Number(param.id))
    }, [])
    const submit = () => {
        deleteProject( project.id)
    }
    return (
        <Card
            style={{ width: 600, marginRight: 15, marginLeft: 15 }}
        >
            <Card.Body>
                <Card.Title>{project.name}</Card.Title>
                <p>
                    {
                        project.description
                    }
                </p>
                <p style={{marginTop:15}}>
                    Tasks: {project.taskIds?.length}
                </p>

                <p>
                    Start Date: {
                        convertDate(project.startDate)
                    }
                </p>
                <p>
                    Expiry Date: {
                        convertDate(project.expiryDate)
                    }
                </p>
                <p>
                    Status: {
                        project.statusName
                    }
                </p>
                <p style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Button onClick={() => navigate(`/project/tasks/${project.id}`)}>
                        Get All Tasks
                    </Button>
                    {
                        roles.find(t => t.name == "Manager")
                        &&
                        <>
                            <Button onClick={() => navigate(`/add/task/${project.id}`)}>
                                Add Task
                            </Button>
                            <Button onClick={() => navigate(`/project/${project.id}/update/status`)}>
                                Update Status
                            </Button>
                            <Button onClick={() => submit()}>
                                Delete Project
                            </Button>
                        </>
                    }
                </p>
            </Card.Body>
        </Card>
    )
}

export default ProjectDetailCard