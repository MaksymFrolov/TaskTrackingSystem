import { FC } from "react"
import Card from "react-bootstrap/esm/Card"
import Stack from "react-bootstrap/esm/Stack"
import UserProjectForm from "../components/UserProjectFrom"

const AddUserProject:FC=()=>{
    return(
        <Stack className="d-flex flex-column min-vh-100 justify-content-center align-items-center">
            <Card className="p-5">
                <UserProjectForm />
            </Card>
        </Stack>
    )
}

export default AddUserProject