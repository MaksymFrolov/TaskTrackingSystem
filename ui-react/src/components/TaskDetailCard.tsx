import { FC, useEffect } from "react"
import Button from "react-bootstrap/esm/Button"
import Card from "react-bootstrap/esm/Card"
import { useNavigate, useParams } from "react-router-dom"
import { useActions } from "../hooks/useActions"
import { useTypedSelector } from "../hooks/useTypedSelector"
import { TaskActionCreators } from "../store/reduce/task/action-creators"
import { convertDate } from "../utils/convertDate"


const TaskDetailCard: FC = () => {
    const navigate = useNavigate()
    const { task } = useTypedSelector(t => t.task)
    const { loadTask, deleteTask } = useActions(TaskActionCreators)
    const { isAuth, roles } = useTypedSelector(state => state.auth)
    const param = useParams()
    useEffect(() => {
        loadTask(Number(param.id))
    }, [])
    const submit = () => {
        deleteTask(task.id)
    }
    return (
        <Card
            style={{ width: 600, marginRight: 15, marginLeft: 15 }}
        >
            <Card.Body>
                <Card.Title>{task.name}</Card.Title>
                <p>
                    {
                        task.description
                    }
                </p>
                <p style={{marginTop:15}}>
                    Users: {task.userProjectIds?.length}
                </p>

                <p>
                    Start Date: {
                        convertDate(task.startDate)
                    }
                </p>
                <p>
                    Expiry Date: {
                        convertDate(task.expiryDate)
                    }
                </p>
                <p>
                    Status: {
                        task.statusName
                    }
                </p>
                <p>
                    Manager: {
                        task.managerUserName
                    }
                </p>
                <p>
                    Project: {
                        task.projectName
                    }
                </p>
                <p style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Button onClick={() => navigate(`/user/projects/${task.id}`)}>
                        Get All Users
                    </Button>
                    <Button onClick={() => navigate(`/task/${task.id}/update/status`)}>
                        Update Status
                    </Button>
                    {
                        roles.find(t => t.name == "Manager")
                        &&
                        <>
                            <Button onClick={() => navigate(`/add/user/project/${task.id}`)}>
                                Add User
                            </Button>
                            <Button onClick={() => submit()}>
                                Delete Task
                            </Button>
                        </>
                    }
                </p>
            </Card.Body>
        </Card>
    )
}

export default TaskDetailCard