import { FC } from "react"
import Stack from "react-bootstrap/esm/Stack"
import { useParams } from "react-router-dom"
import StatusList from "../components/StatusList"

const Statuses:FC=()=>{
    const param = useParams()
    return(
        <Stack className="d-flex flex-column min-vh-100 align-items-center">
            <StatusList name={param.name!}/>
        </Stack>
    )
}

export default Statuses