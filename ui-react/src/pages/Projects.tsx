import { FC } from "react"
import Stack from "react-bootstrap/esm/Stack"
import { useParams } from "react-router-dom"
import ProjectList from "../components/ProjectList"

const Projects:FC=()=>{
    const param = useParams()
    return(
        <Stack className="d-flex flex-column min-vh-100 align-items-center">
            <ProjectList id={Number(param.id)}/>
        </Stack>
    )
}

export default Projects