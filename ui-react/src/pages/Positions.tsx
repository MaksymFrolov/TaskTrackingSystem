import { FC } from "react"
import Stack from "react-bootstrap/esm/Stack"
import { useParams } from "react-router-dom"
import PositionList from "../components/PositionList"

const Positions:FC=()=>{
    const param = useParams()
    return(
        <Stack className="d-flex flex-column min-vh-100 align-items-center">
            <PositionList id={Number(param.id)}/>
        </Stack>
    )
}

export default Positions