import { FC } from "react"
import Card from "react-bootstrap/esm/Card"
import Stack from "react-bootstrap/esm/Stack"
import ProjectForm from "../components/ProjectForm"

const AddProject:FC=()=>{
    return(
        <Stack className="d-flex flex-column min-vh-100 justify-content-center align-items-center">
            <Card className="p-5">
                <ProjectForm />
            </Card>
        </Stack>
    )
}

export default AddProject