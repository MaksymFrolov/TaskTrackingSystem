import { FC } from "react"
import Card from "react-bootstrap/esm/Card"
import Stack from "react-bootstrap/esm/Stack"
import StatusForm from "../components/StatusForm"

const AddStatus:FC=()=>{
    return(
        <Stack className="d-flex flex-column min-vh-100 justify-content-center align-items-center">
            <Card className="p-5">
                <StatusForm />
            </Card>
        </Stack>
    )
}

export default AddStatus