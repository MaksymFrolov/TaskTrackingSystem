import { FC } from "react"
import Stack from "react-bootstrap/esm/Stack"
import { useParams } from "react-router-dom"
import TaskList from "../components/TaskList"

const Tasks:FC=()=>{
    const param = useParams()

    return(
        <Stack className="d-flex flex-column min-vh-100 align-items-center">
            <TaskList 
                name={param.name}
                id={Number(param.id)}
            />
        </Stack>
    )
}

export default Tasks